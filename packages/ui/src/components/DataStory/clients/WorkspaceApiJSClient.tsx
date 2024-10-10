import {
  Application,
  core,
  Diagram,
  Executor,
  InMemoryStorage,
  type InputObserver,
  InputObserverController,
  type ItemValue,
  NodeDescription,
  nodes,
} from '@data-story/core';
import { ClientRunParams } from '../types';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { Subject } from 'rxjs';
import { clientBuffer } from './ClientBuffer';
import { WorkspaceApiClient } from './WorkspaceApiClient';

export const createDiagram = (content = 'Diagram') => {
  const { Signal, Comment, Ignore } = nodes;

  const diagram = core.getDiagramBuilder()
    .add({ ...Signal, label: 'DataSource' }, { period: 200, count: 100 })
    .add({ ...Ignore, label: 'Storage' })
    .above('Signal.1').add(Comment, { content: `### ${content} 🔥` })
    .get();

  return diagram;
}

const getCoreVersion = () => {
  const { version } = require('@data-story/core/package.json');
  return version;
}

class ManualPromise {
  readonly promise: Promise<void>;
  private resolve!: () => void;

  constructor() {
    this.promise = new Promise<void>((resolve) => {
      this.resolve = resolve;
    });
  }

  complete() {
    this.resolve();
  }
}

export class WorkspaceApiJSClient implements WorkspaceApiClient {
  private executor: Executor | undefined
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  run = (
    { updateEdgeCounts, diagram, observers }: ClientRunParams
  ) => {
    eventManager.emit({
      type: DataStoryEvents.RUN_START
    });

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

    this.executionDiagram({
      updateEdgeCounts,
      diagram,
      inputObserverController
    });
  };

  private async executionDiagram({
    updateEdgeCounts,
    diagram,
    inputObserverController
  }: Pick<ClientRunParams, 'updateEdgeCounts' | 'diagram'> & {
    inputObserverController: InputObserverController
  }
  ) {
    const storage = new InMemoryStorage();

    this.executor = this.app!.getExecutor({
      diagram,
      storage,
      inputObserverController
    })

    const execution = this.executor?.execute();

    // For each update run this function
    const handleUpdates = (iterator: AsyncIterator<any>) => {
      iterator.next()
        .then(({ value: update, done }) => {
          if (!done) {
            updateEdgeCounts(update.counts)
            for(const hook of update.hooks) {
              if (hook.type === 'CONSOLE_LOG') {
                console.log(...hook.args)
              } else {
                const userHook = this.app!.hooks.get(hook.type)

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
    handleUpdates(execution![Symbol.asyncIterator]());
  }

  getNodeDescriptions = async({ path }): Promise<NodeDescription[]> => {
    const nodeDescriptions = this.app!.descriptions();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(nodeDescriptions!);
      }, 1000);
    });
  };

  updateTree = async(diagram: Diagram) => {
    // save the diagram in localStorage ?
    console.log(diagram, 'diagram');
  }
}
