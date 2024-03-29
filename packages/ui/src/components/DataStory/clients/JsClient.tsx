import { Application, Diagram, Executor, NodeDescription, NullStorage, } from '@data-story/core';
import { ServerClient } from './ServerClient';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { ItemsApi } from './ItemsApi';

export class JsClient implements ServerClient {
  private setAvailableNodes: (nodes: NodeDescription[]) => void;
  private updateEdgeCounts: (edgeCounts: Record<string, number>) => void;
  private app: Application;
  private executor: Executor | undefined

  constructor({
    setAvailableNodes,
    updateEdgeCounts,
    app,
  }: {
    setAvailableNodes: (nodes: NodeDescription[]) => void,
    updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
    app: Application,
  }) {
    this.setAvailableNodes = setAvailableNodes;
    this.updateEdgeCounts = updateEdgeCounts;
    this.app = app;
  }

  itemsApi = () => {
    return {
      getItems: async ({
        atNodeId,
        limit = 10,
        offset = 0,
      }: {
        atNodeId: string,
        limit?: number,
        offset?: number,

      }) => {
        if(!this.executor) return []

        const items = this.executor.storage.items.get(atNodeId) || [];

        return items.slice(offset, offset + limit);
      }
    }
  }

  init () {
    this.setAvailableNodes(this.app.descriptions())

    console.log('Connected to server: JS')
  }

  run(diagram: Diagram) {
    eventManager.emit({
      type: DataStoryEvents.RUN_START
    });

    const storage = new NullStorage()

    this.executor = new Executor(
      diagram,
      this.app.computers,
      storage
    )

    const execution = this.executor.execute();

    // For each update run this function
    const handleUpdates = (iterator: AsyncIterator<any>) => {
      iterator.next()
        .then(({ value: update, done }) => {
          if (!done) {
            this.updateEdgeCounts(update.counts)
            for(const hook of update.hooks) {
              if(hook.type === 'CONSOLE_LOG') {
                console.log(...hook.args)
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
