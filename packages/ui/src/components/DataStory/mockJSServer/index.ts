import { Application } from '@data-story/core';
import { Subject } from 'rxjs';
import { HandlerParam, getDefaultMsgHandlers, Message, MessageHandlers } from './messageHandlers';

export class MockJSServer {
  chanel: Subject<any> = new Subject();
  private messageHandlers = {};

  constructor({ app, messageHandlers }: {app: Application, messageHandlers?: MessageHandlers}) {
    this.messageHandlers = messageHandlers ?? getDefaultMsgHandlers(app);
    this.start();
  }

  handleMessage = async(message: Message) => {
    if (message.status !== 'client-post') return;
    const handler = this.messageHandlers[message.type] as (params: HandlerParam) => Promise<void>;
    if (!handler) throw new Error('Unknown message type (server): ' + message.type);
    const sendEvent = (msg: Record<string, any>) => {
      this.chanel.next({
        ...msg,
        status: 'server-post',
        msgId: message.msgId
      });
    }

    await handler({
      data: message,
      sendEvent
    });
  }

  private start() {
    this.chanel.subscribe((msg: Message) => {
      this.handleMessage(msg);
    });
    console.log('Client connected 💓');
  }
}
