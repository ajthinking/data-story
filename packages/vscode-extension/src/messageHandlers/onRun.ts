import { Application, coreNodeProvider, Diagram, ExecutionResult, InMemoryStorage, InputObserverController, ReportCallback } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import { vsCodeNodeProvider } from './vsCodeNodeProvider';

export const onRun: MessageHandler = async ({ event, webviewPanel }) => {
  const app = new Application();
  app.register([
    coreNodeProvider,
    vsCodeNodeProvider,
  ]);

  await app.boot();

  const storage = new InMemoryStorage();

  const diagram = new Diagram({
    nodes: event.diagram.nodes,
    links: event.diagram.links,
  })

  const sendMsg: ReportCallback = (items, inputObservers) => {
    webviewPanel.webview.postMessage(JSON.stringify({
      type: 'NotifyObservers',
      inputObservers,
      items
    }))
  }

  const inputObserverController = new InputObserverController(
    event.inputObservers || [],
    sendMsg
  );

  const executor = app.getExecutor({
    diagram,
    storage: new InMemoryStorage(),
    inputObserverController
  });

  const execution = executor.execute()

  try {
    for await(const update of execution) {
      webviewPanel.webview.postMessage(update);
    }

    webviewPanel.webview.postMessage(new ExecutionResult());
  } catch(error: any) {
    console.log('SOME ERROR IN onRun!')
    throw error;
  }
}