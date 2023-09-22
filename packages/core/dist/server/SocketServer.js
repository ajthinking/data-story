"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const ws_1 = __importDefault(require("ws"));
const onMessage_1 = require("./onMessage");
class SocketServer {
    constructor({ app, port = 3100 }) {
        this.app = app;
        this.port = port;
    }
    start() {
        this.wsServer = new ws_1.default.Server({ port: this.port });
        this.wsServer.on('connection', (ws) => {
            ws.on('message', (msg) => (0, onMessage_1.onMessage)(ws, msg, this.app));
            ws.on('close', () => {
                console.log('Client disconnected 😢');
            });
            ws.on('error', (error) => {
                console.log('Error 😱', error);
            });
            console.log('Client connected 💓');
        });
    }
}
exports.SocketServer = SocketServer;
