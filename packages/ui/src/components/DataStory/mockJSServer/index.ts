import { Application, ObserverController, InMemoryObserverStorage } from '@data-story/core';
import { Subject } from 'rxjs';
import { HandlerParam, getDefaultMsgHandlers, Message, MessageHandlers } from './messageHandlers';

export class MockJSServer {
  channel: Subject<any> = new Subject();
  private messageHandlers = {};

  constructor({ app, messageHandlers }: { app: Application, messageHandlers?: MessageHandlers }) {
    const storage = new InMemoryObserverStorage('_');
    const observerController = new ObserverController(storage);

    this.messageHandlers = messageHandlers ?? getDefaultMsgHandlers(app, observerController);
    this.start();
  }

  handleMessage = async(message: Message) => {
    if (message.status !== 'client-post') return;
    const handler = this.messageHandlers[message.type] as (params: HandlerParam) => Promise<void>;
    if (!handler) throw new Error('Unknown message type (server): ' + message.type);

    const sendEvent = (msg: Record<string, any>) => {
      this.channel.next({
        ...msg,
        status: 'server-post',
        msgId: message.msgId,
      });
    }

    await handler({
      data: message,
      sendEvent,
    });
  }

  private start() {
    this.channel.subscribe((msg: Message) => {
      // console.debug('JS_SERVER:msg', msg);
      this.handleMessage(msg);
    });
    console.log('Client connected 💓');
  }
}
