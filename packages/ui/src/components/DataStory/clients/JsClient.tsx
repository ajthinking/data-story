import {
  Diagram,
  Executor,
  ExecutorFactory,
  InMemoryStorage,
  type InputObserver,
  InputObserverController,
  type ItemValue,
} from '@data-story/core';
import { ServerClient } from './ServerClient';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { ItemsOptions } from './ItemsApi';
import type { JSClientOptions, ServerClientObservationConfig } from '../types';
import { Subject } from 'rxjs';
import { clientBuffer } from './ClientBuffer';

export class JsClient implements ServerClient {
  private setAvailableNodes: JSClientOptions['setAvailableNodes'];
  private updateEdgeCounts: JSClientOptions['updateEdgeCounts'];
  private app: JSClientOptions['app'];
  private executor: Executor | undefined

  constructor({
    setAvailableNodes,
    updateEdgeCounts,
    app,
  }: JSClientOptions) {
    this.setAvailableNodes = setAvailableNodes;
    this.updateEdgeCounts = updateEdgeCounts;
    this.app = app;
  }

  itemsApi = () => {
    return {
      getItems: async({
        atNodeId,
        limit = 10,
        offset = 0,
      }: ItemsOptions) => {
        if (!this.executor) return { items: [], total: 0 };

        const items = this.executor.storage.itemsMap.get(atNodeId) || [];

        return {
          items: items.slice(offset, offset + limit),
          total: items.length,
        };
      }
    }
  };

  init() {
    this.setAvailableNodes(this.app.descriptions())

    console.log('Connected to server: JS')
  }

  run(diagram: Diagram, observers?: ServerClientObservationConfig) {
    eventManager.emit({
      type: DataStoryEvents.RUN_START
    });

    const storage = new InMemoryStorage();
    const notifyObservers$: Subject<{items: ItemValue[], inputObservers: InputObserver[]}> = new Subject();

    notifyObservers$.pipe(
      clientBuffer(50)
    ).subscribe((data) => {
      observers?.onDataChange(
        data.items,
        data.inputObservers
      )
    });

    const inputObserverController = new InputObserverController(
      observers?.inputObservers || [],
      (items: ItemValue[], inputObservers: InputObserver[]) => {
        notifyObservers$.next({ items, inputObservers });
      }
    );

    this.executor = ExecutorFactory.create({
      diagram,
      registry: this.app.registry,
      storage,
      inputObserverController
    })

    const execution = this.executor.execute();

    // For each update run this function
    const handleUpdates = (iterator: AsyncIterator<any>) => {
      iterator.next()
        .then(({ value: update, done }) => {
          if (!done) {
            this.updateEdgeCounts(update.counts)
            for(const hook of update.hooks) {
              if (hook.type === 'CONSOLE_LOG') {
                console.log(...hook.args)
              } else {
                const userHook = this.app.hooks.get(hook.type)

                if (userHook) {
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
