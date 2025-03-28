import { Node } from './types/Node';
import { ExecutionUpdate } from './types/ExecutionUpdate';
import { isFinished } from './utils/isFinished';
import { ExecutionMemory } from './ExecutionMemory';
import { mapToRecord } from './utils/mapToRecord';
import { arrayToRecord } from './utils/arrayToRecord';
import { Diagram } from './Diagram';
import { Registry } from './Registry';

export type NodeStatus = 'AVAILABLE' | 'BUSY' | 'COMPLETE';

export class Executor {
  public readonly memory: ExecutionMemory;
  public diagram: Diagram;
  public registry: Registry;
  public hasLoop: boolean;

  constructor(params: {
    diagram: Diagram;
    registry: Registry;
    memory: ExecutionMemory;
  }) {
    this.diagram = params.diagram
    this.registry = params.registry
    this.memory = params.memory
    this.hasLoop = this.diagram.hasLoop()
  }

  async *execute(abortSignal?: AbortSignal): AsyncGenerator<ExecutionUpdate, void, void> {
    let pendingPromises: Promise<void>[] = []
    let executionError: Error | undefined

    while(!this.isComplete() && !executionError && !abortSignal?.aborted) {
      // cleanup old promises that are done
      pendingPromises = await this.clearFinishedPromises(pendingPromises)

      // Start execution of all nodes that can run
      const runnables = this.getRunnableNodes()

      const promises = runnables.map(node => {
        // Put node in busy state
        this.memory.setNodeStatus(node.id, 'BUSY')

        // Run
        const context = this.memory.getNodeRunnerContext(node.id)
        const runner = context!.status!;
        // const runner = this.memory.getNodeRunner(node.id)!;
        return runner.next()
          .then((result: IteratorResult<undefined, void>) => {
            if(result.done) {
              this.markNodeComplete(node);
              return;
            }

            // Not done, so node is available again!
            this.memory.setNodeStatus(node.id, 'AVAILABLE')
          })
          .catch((error: Error) => {
            console.error('Registering an execution error')
            executionError = error;
          })
      })

      // Add this batch of promises to the pending list
      pendingPromises.push(...promises)

      // Attempt cleanup of not runnables (TODO: EXPENSIVE?)
      const notRunnables = this.diagram.nodes.filter(node => !runnables.includes(node))
      for(const notRunnable of notRunnables) {
        await this.attemptToMarkNodeComplete(notRunnable);
      }

      if (abortSignal?.aborted) {
        break;
      }

      // If no promises, then we might be stuck
      if(pendingPromises.length === 0) {
        // Check for nodes we can mark as complete
        for(const node of this.diagram.nodes) {
          await this.attemptToMarkNodeComplete(node);
        }
      }

      // await only the first state change since
      // it can open up for more nodes to proceed immediately
      if(pendingPromises.length > 0) {
        await Promise.race(pendingPromises);
        yield {
          type: 'ExecutionUpdate',
          counts: mapToRecord(this.memory.getLinkCounts()),
          hooks: this.memory.pullHooks(),
          state: 'running',
        }
      }
    }

    if(executionError) {
      console.error('Rethrowing the execution error in an awaitable timeline')
      throw(executionError)
    }

    if (abortSignal?.aborted) {
      throw new Error('Execution aborted');
    }

    yield {
      type: 'ExecutionUpdate',
      counts: mapToRecord(this.memory.getLinkCounts()),
      hooks: this.memory.pullHooks(),
      state: 'complete',
    }
  }

  protected isComplete(): boolean {
    for(const status of this.memory.getNodeStatuses().values()) {
      if(status !== 'COMPLETE') return false;
    }

    return true
  }

  protected getRunnableNodes(): Node[] {
    return this.diagram.nodes.filter(node => {
      // If the computer implements a custom hook
      const computer = this.registry.computers[node.name]
      const hook = computer.canRun
      if(hook) return hook({
        isAvailable: () => this.memory.getNodeStatus(node.id) === 'AVAILABLE',
        input: this.memory.getInputDevice(node.id)!,
        // todo: It seems the params didn't evaluate correctly
        params: arrayToRecord(node.params, 'name'),
      })

      // Decide with some heuristics
      return this.canRunNodeDefault(node)
    })
  }

  protected async clearFinishedPromises(promises: Promise<void>[]) {
    const passed = []

    for(const promise of promises) {
      if(await isFinished(promise)) continue;
      passed.push(promise)
    }

    return passed
  }

  /**
   * Default heuristics for deciding if a node can run.
   */
  protected canRunNodeDefault(node: Node) {
    // Get the nodes input device
    const inputDevice = this.memory.getInputDevice(node.id)!

    // Must be available
    if(this.memory.getNodeStatus(node.id) !== 'AVAILABLE') return false;

    // If one input port, it must not be empty
    const [ input1 ] = node.inputs
    if(input1 && !inputDevice.haveItemsAtInput(input1.name)) return false;

    // If two or more ports, all items must be awaited
    if(node.inputs.length >= 2 && !inputDevice.haveAllItemsAtAllInputs()) return false;

    // All passed
    return true
  }

  /**
   * Marks nodes as complete if some default heuristics are met.
   */
  protected async attemptToMarkNodeComplete(node: Node) {
    // Avoid costly loop checks unless diagram has a loop
    if(this.hasLoop) {
      const loop = this.diagram.getLoopForNode(node)
      if(loop) return await this.attemptToMarkLoopNodeComplete(node)
    }

    // Node must not be busy
    if(this.memory.getNodeStatus(node.id) === 'BUSY') return;

    // Node must have no awaiting items at links
    const input = this.memory.getInputDevice(node.id)!
    if(input.haveItemsAtAnyInput()) return;

    // Node must have no incomplete ancestors
    const ancestors = this.diagram.directAncestor(node)

    for(const ancestor of ancestors) {
      if(this.memory.getNodeStatus(ancestor.id) !== 'COMPLETE') return;
    }

    this.markNodeComplete(node);
  }

  private markNodeComplete(node: Node) {
    const context = this.memory.getNodeRunnerContext(node.id);
    context?.onComplete();
    this.memory.setNodeStatus(node.id, 'COMPLETE');
  }

  /**
   * Marks nodes as complete if:
   *  - all loop nodes are non busy
   *  - all links are empty
   */
  protected async attemptToMarkLoopNodeComplete(node: Node) {
    // must be a loop node
    const loop = this.diagram.getLoopForNode(node)
    if(!loop) throw new Error(`Node is not part of a loop: ${node.id}`)

    // Ensure no node in the loop is busy
    for(const node of loop) {
      if(this.memory.getNodeStatus(node.id) === 'BUSY') return;
    }

    // Ensure all ancestor outside of the loop is complete
    const ancestors = this.diagram.getAncestors(node)
    for(const ancestor of ancestors) {
      if(loop.includes(ancestor)) continue;
      if(this.memory.getNodeStatus(ancestor.id) !== 'COMPLETE') return;
    }

    // Ensure no loop or ancestor link have unprocessed items
    const links = this.diagram.getAnscestorLinks(node)
    for(const link of links) {
      const items = this.memory.getLinkItems(link.id)
      if(items && items.length > 0) return;
    }

    this.markNodeComplete(node);
  }
}
