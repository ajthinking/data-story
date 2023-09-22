import { Application } from '../Application';
interface SocketServerOptions {
    app: Application;
    port?: number;
}
export declare class SocketServer {
    private app;
    private port;
    private wsServer?;
    constructor({ app, port }: SocketServerOptions);
    start(): void;
}
export {};
