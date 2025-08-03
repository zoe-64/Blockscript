import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { PassThrough } from 'stream';
import { fileURLToPath } from 'url';
import vm from 'vm';
import * as Blockly from 'blockly';
import { loadBlocks } from './loadBlocks.mjs';
import { javascriptGenerator } from 'blockly/javascript';
import { API_Connector } from 'bc-bot';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

loadBlocks();



const app = express();
const server = createServer(app);

const clients = new Set<PassThrough>();
let execution: vm.Script | undefined;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'localhost');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  next();
});

app.get('/api/console-stream', (req, res) => {
  console.log('New client connected');

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });
  res.flushHeaders();

  res.write('event: connected\ndata: SSE ready\n\n');

  const clientId = Date.now();
  const clientStream = new PassThrough();
  clients.add(clientStream);

  clientStream.pipe(res);

  req.on('close', () => {
    console.log(`Client ${clientId} disconnected`);
    clients.delete(clientStream);
  });
});

setInterval(() => {
  const message = `Server time: ${new Date().toISOString()}`;
  clients.forEach(client => {
    client.write(`event: message\ndata: ${JSON.stringify(message)}\n\n`);
  });
}, 2000);

app.use(express.static(path.join(__dirname, '../../public/')));
app.use(express.json());

app.post('/api/run-workspace', async (req, res) => {
 const { workspaceJSON } = req.body;

  const json = JSON.parse(workspaceJSON);
  const newWorkspace = new Blockly.Workspace();
  Blockly.serialization.workspaces.load(json, newWorkspace);
  const code = javascriptGenerator.workspaceToCode(newWorkspace);

  const broadcast = (type: string, message: string) => {
    clients.forEach(stream => {
      stream.write(`event: ${type}\ndata: ${JSON.stringify(message)}\n\n`);
    });
  };

  const contextObject = {
    console: {
      log: (...args: any[]) => broadcast('log', args.join(' ')),
      warn: (...args: any[]) => broadcast('warn', args.join(' ')),
      error: (...args: any[]) => broadcast('error', args.join(' '))
    },
    broadcast,
    API_Connector: function (url: string, username: string, password: string, env: "test" | "live") {
      return new API_Connector(url, username, password, env);
    },
  };

  const context = vm.createContext(contextObject);

  const wrappedCode = `
    (async () => {
      ${code}
    })().catch(e => {console.error(e); console.error(e.stack)}); 
  `;
  
  try {
    await vm.runInContext(wrappedCode, context);

    res.status(200).json({ success: true });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
    broadcast('error', e.message);
    broadcast('error', e.stack);
    broadcast('warn', code);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});