import WebSocket from 'ws';
import { Application } from '../Application';
export declare const onMessage: (ws: WebSocket, message: string, app: Application) => Promise<void>;
