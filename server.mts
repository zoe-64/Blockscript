import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { PassThrough } from 'stream';
import { fileURLToPath } from 'url';
import { VM } from 'vm2';
// Since __dirname is not available in ESM, reconstruct it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const clients = new Set<PassThrough>();

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

  // Send initial keep-alive message
  res.write('event: connected\ndata: SSE ready\n\n');

  const clientId = Date.now();
  const clientStream = new PassThrough();
  clients.add(clientStream);

  // Forward stream to client
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

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/run-code', (req, res) => {
  const { code } = req.body;
  try {
    // Create a custom console that broadcasts logs
    const broadcastLog = (type: 'log' | 'error', ...args: any[]) => {
      const message = args.join(' ');
      clients.forEach(stream => {
        stream.write(`event: ${type}\ndata: ${JSON.stringify(message)}\n\n`);
      });
    };

    const customConsole = {
      log: (...args: any[]) => broadcastLog('log', ...args),
      error: (...args: any[]) => broadcastLog('error', ...args),
    };

    const vm = new VM({
      timeout: 5000,
      sandbox: { console: customConsole },
    });

    vm.run(code); // Runs asynchronously

    res.status(200).json({ success: true });

  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});