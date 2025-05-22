import { IncomingMessage, RequestListener, ServerResponse } from 'http';

export const healthCheckHandler: RequestListener = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/health' && req.method === 'GET') {
    const memory = process.memoryUsage();
    const cpu = process.cpuUsage();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      memory,
      cpu,
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
};
