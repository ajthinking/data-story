import WebSocket from 'ws';
import { createDataStoryId } from '@data-story/core';

interface WebSocketResponse {
  sessionId: string;
  data: any; // 根据你的实际数据结构调整
}

// 存储等待中的响应的 Promise 的解析和拒绝函数
const pendingResponses: Map<string, { resolve: Function; reject: Function }> = new Map();

// 生成唯一的 sessionId，简单示例
function generateSessionId(): string {
  return createDataStoryId();
}

// 监听WebSocket服务器的消息
const initListener = (wsClient: WebSocket) => {
  wsClient.on('message', (message: string) => {
    const response: WebSocketResponse = JSON.parse(message);

    // 检查是否有等待这个 sessionId 的响应
    const pending = pendingResponses.get(response.sessionId);
    if (pending) {
      pending.resolve(response.data);
      pendingResponses.delete(response.sessionId);
    }
  });
}

// 发送消息并等待响应的函数
async function sendRequest( wsClient: WebSocket, params: any): Promise<any> {
  const sessionId = generateSessionId(); // 实现 generateSessionId 来生成唯一的 sessionId
  const message = {
    sessionId,
    ...params,
  };

  wsClient.send(JSON.stringify(message));

  return new Promise((resolve, reject) => {
    pendingResponses.set(sessionId, { resolve, reject });

    // config 10s timeout for the rejection
    setTimeout(() => {
      if (pendingResponses.has(sessionId)) {
        pendingResponses.delete(sessionId);
        reject(new Error('Request timed out'));
      }
    }, 10000);
  });
}

async function exampleUsage() {
  const wsClient = new WebSocket('ws://localhost:3300');
  initListener(wsClient);
  try {
    const response = await sendRequest(wsClient, { action: 'getData', payload: {} });
    console.log('Response from WebSocket server:', response);
  } catch (error) {
    console.error('Error:', error);
  }
}

exampleUsage();
