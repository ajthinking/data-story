import next from 'next';
import { createServer } from 'http';
import { parse } from 'url';
import { SocketServer } from '@data-story/nodejs';
import { dataStoryApp } from '~/dataStoryApp';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log('EVEN LOADING????')

app.prepare().then(() => {
  console.log('LOADED NEXT APP!');
  const httpServer = createServer((req, res) => {
    if (!req.url) {
      console.error('Request URL is undefined');
      res.statusCode = 400;
      res.end('Bad Request: URL is undefined');
      return;
    }

    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Initialize DataStory SocketServer
  const dataStoryServer = new SocketServer({
    app: dataStoryApp,
    port: 3100    // Specify port if needed, else it uses the same as HTTP server
  });

  dataStoryServer.start();

  // Start the HTTP server
  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
    console.log('STARTED DATASTORY SERVER!');
  });
});