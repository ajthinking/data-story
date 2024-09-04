import { WebSocketSubject } from 'rxjs/webSocket';
import { GetTreeMessage, GetTreeResponse } from './WorkspaceSocketClient';

// 存储等待中的响应的 Promise 的解析和拒绝函数
const pendingResponses: Map<string, {resolve: Function; reject: Function}> = new Map();

// 监听WebSocket服务器的消息
export const initListener = (message: GetTreeResponse) => {
  console.log('Received message:', message);
  const response: GetTreeResponse = message;

  // 检查是否有等待这个 sessionId 的响应
  const pending = pendingResponses.get(response.id);
  console.log('pending', pending);
  if (pending) {
    console.log('Received response:', response);
    pending.resolve(response);
    pendingResponses.delete(response.id);
  }
}

// 发送消息并等待响应的函数
export async function sendRequest(wsClient: WebSocketSubject<any>, params: GetTreeMessage): Promise<any> {
  wsClient.next(params);
  const { id } = params;

  return new Promise((resolve, reject) => {
    pendingResponses.set(id, { resolve, reject });

    // config 10s timeout for the rejection
    setTimeout(() => {
      if (pendingResponses.has(id)) {
        pendingResponses.delete(id);
        reject(new Error('Request timed out'));
      }
    }, 10000);
  });
}
