import { Node } from './types/Node';
import { ExecutionUpdate } from './types/ExecutionUpdate';
import { isFinished } from './utils/isFinished';
import { ExecutionMemory } from './ExecutionMemory';
import { mapToRecord } from './utils/mapToRecord';
import { arrayToRecord } from './utils/arrayToRecord';
import { Diagram } from './Diagram';
import { Registry } from './Registry';
import { Storage } from './types/Storage';

export type NodeStatus = 'AVAILABLE' | 'BUSY' | 'COMPLETE';

export class Executor {
  public readonly memory: ExecutionMemory;
  public diagram: Diagram;
  public registry: Registry;
  public storage: Storage;

  constructor(params: {
    diagram: Diagram;
    registry: Registry;
    storage: Storage;
    memory: ExecutionMemory;
  }) {
    this.diagram = params.diagram
    this.registry = params.registry
    this.storage = params.storage
    this.memory = params.memory
  }

  async *execute(): AsyncGenerator<ExecutionUpdate, void, void> {
    let pendingPromises: Promise<void>[] = []
    let executionError: Error | undefined

    while(!this.isComplete() && !executionError) {
      // cleanup old promises that are done
      pendingPromises = await this.clearFinishedPromises(pendingPromises)

      // Start execution of all nodes that can run
      const runnables = this.getRunnableNodes()

      const promises = runnables.map(node => {
        // Put node in busy state
        this.memory.setNodeStatus(node.id, 'BUSY')

        // Run
        const runner = this.memory.getNodeRunner(node.id)!;
        return runner.next()
          .then((result: IteratorResult<undefined, void>) => {
            if(result.done) {
              this.memory.setNodeStatus(node.id, 'COMPLETE');
              // TODO: The problem with this implementation:
              // If a node is done, but its output is not yet consumed,
              // then yes we can mark node as complete, but we will not be
              // able to complete decendant nodes depending on it.
              // Because they probably still have the just outputted items to process.
              // So, we have to wait until the "cleanup" loop.
              // This can be solved by having a "consumed" flag on the node ??
              // Or, upon a "rounds complete event" the input device can notify ??
              // Or something else...
              this.diagram.directDescendant(node).forEach(node => {
                this.attemptToMarkNodeComplete(node);
              })

              return;
            }

            // Not done, so node is available again!
            this.memory.setNodeStatus(node.id, 'AVAILABLE')
          })
          .catch((error: Error) => {
            console.log('Registering an execution error')
            executionError = error;
          })
      })

      // Add this batch of promises to the pending list
      pendingPromises.push(...promises)

      // Attempt cleanup of not runnables (TODO: EXPENSIVE?)
      const notRunnables = this.diagram.nodes.filter(node => !runnables.includes(node))
      for(const notRunnable of notRunnables) {
        this.attemptToMarkNodeComplete(notRunnable);
      }

      // If no promises, then we might be stuck
      if(pendingPromises.length === 0) {
        // Check for nodes we can mark as complete
        for(const node of this.diagram.nodes) {
          this.attemptToMarkNodeComplete(node);
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
      console.log('Rethrowing the execution error in an awaitable timeline')
      throw(executionError)
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
  protected attemptToMarkNodeComplete(node: Node) {
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

    // Passed all checks, so mark as complete
    this.memory.setNodeStatus(node.id, 'COMPLETE')
  }
}
