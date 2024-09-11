import {
  Application,
  core,
  coreNodeProvider,
  Diagram,
  Executor,
  InMemoryStorage,
  type InputObserver,
  InputObserverController,
  type ItemValue,
  NodeDescription,
  nodes,
  Tree
} from '@data-story/core';
import { ClientRunParams, LocalTree } from '../types';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { Subject } from 'rxjs';
import { clientBuffer } from './ClientBuffer';
import { parseDiagramTreeInfo } from './parseDiagramTreeInfo';
import { UpdateTreeParam, WorkspaceApiClient } from './WorkspaceApiClient';

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

const saveTrees = (key: string, trees: Tree[]) => {
  try {
    const treeJSON = JSON.stringify({
      type: 'save',
      version: getCoreVersion(),
      name: key,
      trees: trees
    } as LocalTree);

    localStorage?.setItem(key, treeJSON);
  } catch(e) {
    console.error(e);
  }
};

const loadTrees = (key: string): Tree[] => {
  const initTreeInfo: LocalTree = {
    type: 'load',
    version: getCoreVersion(),
    name: key,
    trees: []
  }

  if (typeof window === 'undefined' || !localStorage?.getItem(key)) {
    return initTreeInfo.trees;
  }

  return parseDiagramTreeInfo(localStorage?.getItem(key) || '');
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
  private app?: Application;
  private appInitialized = new ManualPromise();

  constructor(app?: Application) {
    this.initApp(app)
  }

  initApp = async(application?: Application) => {
    if (application) {
      this.app = application;
      this.appInitialized.complete();
      return
    }

    const app = new Application()
      .register(coreNodeProvider)
    await app.boot();
    this.app = app;
    this.appInitialized.complete();
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
    await this.appInitialized.promise;

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
    await this.appInitialized.promise;
    const nodeDescriptions = this.app!.descriptions();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(nodeDescriptions!);
      }, 1000);
    });
  };

  getTree = async({ path }: {path: string}) => {
    const trees = loadTrees(path);
    if (trees && trees.length) return trees;

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
    ] as Tree[];
    saveTrees(path, defaultTree);
    return defaultTree
  };

  updateTree = async({ path, tree }: UpdateTreeParam) => {
    saveTrees(path, tree);
    return tree;
  };

  async createTree() {
    console.log('Creating tree from WorkspaceSocketClient')
    return [] as Tree[]
  }

  async destroyTree() {
    console.log('Destroying tree from WorkspaceSocketClient')
  }

  async moveTree() {
    console.log('Moving tree from WorkspaceSocketClient')
    return [] as Tree[]
  }
}
