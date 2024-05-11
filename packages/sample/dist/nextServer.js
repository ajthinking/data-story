"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_1 = __importDefault(require("next"));
const http_1 = require("http");
const url_1 = require("url");
const nodejs_1 = require("@data-story/nodejs");
const dataStoryApp_1 = require("~/dataStoryApp");
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
console.log('EVEN LOADING????');
app.prepare().then(() => {
    console.log('LOADED NEXT APP!');
    const httpServer = (0, http_1.createServer)((req, res) => {
        if (!req.url) {
            console.error('Request URL is undefined');
            res.statusCode = 400;
            res.end('Bad Request: URL is undefined');
            return;
        }
        const parsedUrl = (0, url_1.parse)(req.url, true);
        handle(req, res, parsedUrl);
    });
    // Initialize DataStory SocketServer
    const dataStoryServer = new nodejs_1.SocketServer({
        app: dataStoryApp_1.dataStoryApp,
        port: 3100 // Specify port if needed, else it uses the same as HTTP server
    });
    dataStoryServer.start();
    // Start the HTTP server
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`> Ready on http://localhost:${PORT}`);
        console.log('STARTED DATASTORY SERVER!');
    });
});
