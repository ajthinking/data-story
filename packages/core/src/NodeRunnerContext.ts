import { NodeId } from './types/Node';

export class NodeRunnerContext {
  private onCompleteFns: Function[] = [];
  public status?: AsyncGenerator<undefined, void, void>;
  private nodeId: NodeId;
  constructor(nodeId: NodeId) {
    this.nodeId = nodeId;
  }
  /**
   * Register a function to be called when the node is complete
   * @param fn The function to call
   */
  registerOnComplete = (fn: Function) => {
    this.onCompleteFns.push(fn)
  }
  /**
   * Call all registered onComplete functions
   * todo: handle errors
   */
  async onComplete() {
    for(const fn of this.onCompleteFns) {
      await fn()
    }
  }
}