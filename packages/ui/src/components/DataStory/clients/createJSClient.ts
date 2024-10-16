import { Application, } from '@data-story/core';
import { filter } from 'rxjs';
import { createTransport, TransportConfig } from './createTransport';
import { WorkspaceApiClientBase } from './WorkspaceApiClientBase';
import { MockJSServer } from '../mockJSServer';

function createJSTransport(app: Application) {
  const jsServer = new MockJSServer({ app });
  const config: TransportConfig = {
    postMessage: (msg) => {
      jsServer.chanel.next({
        ...msg,
        status: 'client-post'
      });
    },
    messages$: jsServer.chanel.pipe(
      filter((msg) => msg.status === 'server-post')
    ),
  };
  return createTransport(config);
}

export const createJSClient = (app: Application) => {
  const transport = createJSTransport(app);
  return new WorkspaceApiClientBase(transport);
}
