import next from 'next';
import { createServer } from 'http';
import { parse } from 'url';
import { SocketServer } from '@data-story/nodejs';
import { dataStoryApp } from './dataStoryApp';

const NEXT_PORT = process.env.PORT || 3000;
const DATASTORY_PORT = Number(process.env.DATASTORY_PORT) || 3300;

const dev = process.env.NODE_ENV !== 'production';

/**
 * Custom NextJS server
 * Purpose is to have the DataStory NodeJS server
 * running alongside the NextJS server
 * so everything can be started with a single command
 * Note, this server is only used in development
 */
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
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
    port: DATASTORY_PORT
  });

  dataStoryServer.start();

  // Start the HTTP server
  httpServer.listen(NEXT_PORT, () => {
    console.log(`> Ready on http://localhost:${NEXT_PORT}`);
    console.log(`> Started DataStory NodeJS server on ${DATASTORY_PORT}`);
  });
});