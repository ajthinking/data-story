import { Application, Diagram, Executor, NodeDescription, NullStorage, } from '@data-story/core';
import { ServerClient } from './ServerClient';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';

export class JsClient implements ServerClient {
  private setAvailableNodes: (nodes: NodeDescription[]) => void;
  private updateEdgeCounts: (edgeCounts: Record<string, number>) => void;
  private addPeekItems: (key: string, peek: any[]) => void;
  private setNodes: (nodes: any) => void;
  private setEdges: (edges: any) => void;
  private app: Application;

  // Constructor rewritten to use named parameters
  constructor(
    {
      setAvailableNodes,
      updateEdgeCounts,
      addPeekItems,
      setNodes,
      setEdges,
      app,
    }: {
      setAvailableNodes: (nodes: NodeDescription[]) => void,
      updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
      addPeekItems: (key: string, peek: any[]) => void,
      setNodes: (nodes: any) => void,
      setEdges: (edges: any) => void,
      app: Application,
    }
  ) {
    this.setAvailableNodes = setAvailableNodes;
    this.updateEdgeCounts = updateEdgeCounts;
    this.addPeekItems = addPeekItems;
    this.setNodes = setNodes;
    this.setEdges = setEdges;
    this.app = app;
  }

  init () {
    this.setAvailableNodes(this.app.descriptions())

    console.log('Connected to server: JS')
  }

  run(diagram: Diagram) {
    const storage = new NullStorage()

    const executor = new Executor(
      diagram,
      this.app.computers,
      storage
    )

    const execution = executor.execute();

    // For each update run this function
    const handleUpdates = (iterator: AsyncIterator<any>) => {
      iterator.next()
        .then(({ value: update, done }) => {
          if (!done) {
            this.updateEdgeCounts(update.counts)
            for(const hook of update.hooks) {
              if(hook.type === 'CONSOLE_LOG') {
                console.log(...hook.args)
              } else if(hook.type === 'PEEK') {
                const [ nodeId, items ] = hook.args
                this.addPeekItems(nodeId, items)
              } else {
                const userHook = this.app.hooks.get(hook.type)

                if(userHook) {
                  userHook(...hook.args)
                }
              }
            }

            // Then wait for the next one
            handleUpdates(iterator);
          } else {
            console.log('Execution complete 💫');
            eventManager.emit({
              type: DataStoryEvents.RUN_SUCCESS
            });
          }
        })
        .catch((error: any) => {
          eventManager.emit({
            type: DataStoryEvents.RUN_ERROR,
            payload: error
          });
          console.log('Error', error)
        })
    }

    // Start the updates
    handleUpdates(execution[Symbol.asyncIterator]());
  }

  async save(name: string, diagram: Diagram) {
  }

}
