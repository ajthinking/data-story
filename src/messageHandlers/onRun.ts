import { Application, coreNodeProvider, Diagram, ExecutionResult, InMemoryStorage } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';

export const onRun: MessageHandler = async ({ event, webviewPanel }) => {
  const app = new Application();
  app.register(coreNodeProvider)
  await app.boot();

  const diagram = new Diagram({
    nodes: event.diagram.nodes,
    links: event.diagram.links,
  })

  // webviewPanel.webview.postMessage({});
  // const diagram = new Diagram({
  //   nodes: data.diagram.nodes,
  //   links: data.diagram.links,
  // })

  // const sendMsg: ReportCallback = (items, inputObservers) => {
  //   ws.send(JSON.stringify({
  //     type: 'NotifyObservers',
  //     inputObservers,
  //     items
  //   }))
  // }

  // const inputObserverController = new InputObserverController(
  //   data.inputObservers,
  //   sendMsg
  // );

  const executor = app.getExecutor({
    diagram,
    storage: new InMemoryStorage(),
    // inputObserverController
  });

  const execution = executor.execute()

  try {
    for await(const update of execution) {
      webviewPanel.webview.postMessage(update);
    }

    webviewPanel.webview.postMessage(new ExecutionResult());

  } catch(error: any) {
    console.log("SOME ERROR IN onRun!")
    throw error;
  }  
}