import WebSocket from 'ws';
import { Container } from '../Container';
export declare const onMessage: (ws: WebSocket, message: string, app: Container) => Promise<void>;
