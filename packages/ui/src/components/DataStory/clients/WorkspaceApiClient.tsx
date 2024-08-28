import {
  Application,
  core,
  coreNodeProvider,
  Diagram, Executor,
  InMemoryStorage,
  type InputObserver, InputObserverController,
  type ItemValue,
  nodes
} from '@data-story/core';
import { WorkspacesApi } from './WorkspacesApi';
import type { JSClientOptions, ServerClientObservationConfig } from '../types';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { Subject } from 'rxjs';
import { clientBuffer } from './ClientBuffer';

export const createDiagram = (content = 'Diagram') => {
  const { Signal, Comment, Ignore } = nodes;

  const diagram = core.getDiagramBuilder()
    .add({...Signal, label: 'DataSource'}, { period: 200, count: 100})
    .add({...Ignore, label: 'Storage'})
    .above('Signal.1').add(Comment, { content: `### ${content} 🔥`})
    .get();

  return diagram;
}

export class WorkspaceApiClient {
  private executor: Executor | undefined

  run(
    { updateEdgeCounts, app, diagram, observers }:
    {
      updateEdgeCounts: JSClientOptions['updateEdgeCounts'],
      app: JSClientOptions['app'],
      diagram: Diagram,
      observers?: ServerClientObservationConfig
    }) {
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

    this.executor = app.getExecutor({
      diagram,
      storage,
      inputObserverController
    })

    const execution = this.executor.execute();

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
                const userHook = app.hooks.get(hook.type)

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

  workspacesApi: WorkspacesApi = {
    getNodeDescriptions: async({ path }) => {
      const app = new Application();
      app.register(coreNodeProvider);
      app.boot();
      const nodeDescriptions = app.descriptions();

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(nodeDescriptions);
        }, 1000);
      });
    },

    getTree: async({ path }) => {
      // const treeJson = localStorage.getItem(path)
      // console.log('treeJson', treeJson)
      // if(treeJson) return parseDiagramTree(treeJson)

      // console.log('No tree found at path', path)
      // If no tree at path
      // For testing purposes: Persist and return a default tree
      const defaultTree = [{
        path: '/',
        type: 'folder',
        name: '/',
        id: 'root',
        children: [
          {
            name: 'main',
            id: 'main',
            path: '/main',
            type: 'file',
            content: createDiagram('main diagram'),
          },
          {
            name: 'dev',
            id: 'dev',
            path: '/dev',
            type: 'file',
            content: new Diagram(),
          }
        ],
      },
      {
        path: '/branch',
        type: 'file',
        id: 'branch',
        name: 'branch',
        content: createDiagram(' branch diagram'),
      }
      ];
      // localStorage.setItem(path, JSON.stringify(defaultTree))
      return defaultTree
    },
  } as WorkspacesApi
}
