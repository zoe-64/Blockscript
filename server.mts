import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { PassThrough } from 'stream';
import { fileURLToPath } from 'url';
import ivm from 'isolated-vm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);

const clients = new Set<PassThrough>();
let execution: ivm.Isolate | undefined;

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

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/run-code', async (req, res) => {
  const { code } = req.body;

 const broadcastRef = new ivm.Reference((type: string, message: string) => {
    clients.forEach(stream => {
      stream.write(`event: ${type}\ndata: ${JSON.stringify(message)}\n\n`);
    });
  });

  if (execution) {
      execution.dispose();
      execution = undefined;
  }
  execution = new ivm.Isolate({ memoryLimit: 256 });
  try {
    const context = execution.createContextSync();
    await context.global.set('__broadcast', broadcastRef);
    await context.eval(`
      console = {
        log: (...args) => __broadcast.applyIgnored(undefined, ['log', args.join(' ')]),
        warn: (...args) => __broadcast.applyIgnored(undefined, ['warn', args.join(' ')]),
        error: (...args) => __broadcast.applyIgnored(undefined, ['error', args.join(' ')])
      };
    `);

    const wrappedCode = `
        (async function() {
        ${code}
        })();
    `;

    await context.eval(wrappedCode, { timeout: 5000 });

    res.status(200).json({ success: true });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});