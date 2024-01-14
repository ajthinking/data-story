import { Application, Diagram, Executor, NodeDescription, NullStorage, } from '@data-story/core';
import { loadDiagramFromJSON, saveDiagramToJSON, ServerClient } from './ServerClient';

export class JsClient implements ServerClient {
  name: string;
  constructor(
    private setAvailableNodes: (nodes: NodeDescription[]) => void,
    private updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
    private addPeekItems: (key: string, peek: any[]) => void,
    private setNodes: (nodes: any) => void,
    private setEdges: (edges: any) => void,
    // private setViewport: (viewport: any) => void,
    private app: Application,
  ) {
    this.name = 'JSClient';
  }

  init () {
    this.setAvailableNodes(this.app.descriptions())
    return this.load(this.name)?.diagram;
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
            console.log('Execution complete 💫')
          }
        })
        .catch((error: any) => {
          alert('There was an error! Review console!')
          console.log('Error', error)
        })
    }
    
    // Start the updates
    handleUpdates(execution[Symbol.asyncIterator]());

    this.save(this.name, diagram);
  }

  async save(name: string, diagram: Diagram) {
    const resultJSON = saveDiagramToJSON(name, diagram);

    localStorage.setItem(name ?? this.name, resultJSON);
  }

  load(name: string) {
    const resultJSON = localStorage.getItem(name ?? this.name);

    if(!resultJSON) return null;

    return loadDiagramFromJSON(resultJSON!);
  }
}
