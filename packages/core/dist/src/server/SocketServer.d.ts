import { Container } from '../Container';
interface SocketServerOptions {
    app: Container;
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
