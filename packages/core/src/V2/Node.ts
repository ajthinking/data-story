import { Observable, SubscriptionLike } from 'rxjs';
// todo: need double check the description
/**
 * get data stream from the one port of the node
 */
export interface PortProvider {
  getPort(portName: string): Observable<unknown>;
}

/**
 * creates a granted-to-complete data stream
 * when the data stream completes, the S itself also reaches its complete state.
 */
export interface SourceNode {
  nodeType: 'source';

  getOutput(): PortProvider;
}

/**
 * In the Flow list, every incoming data from the previous node, makes O create a new granted-to-complete data-stream for the next node.
 * Therefore, O is stateless, it doesn't have a complete state, it propagates the complete state from the previous node to the next node.
 */
export interface OperatorNode {
  nodeType: 'operator';

  getOutput(inputs: PortProvider): PortProvider;
}

export type WatcherEvent = 'completed' | 'errored';

export interface IWatcherResult {
  subscription: SubscriptionLike;
  readonly events: Observable<WatcherEvent>;
}

/**
 * W consumes data from the previous node, when the previous node comes to the complete state, the W reaches to its complete state.
 */
export interface WatcherNode {
  nodeType: 'watcher';

  watch(inputs: PortProvider): IWatcherResult;
}

/**
 * The configuration of the source node operator part
 */

export interface SourceNodeOperatorConfig {
  boot: (param: unknown) => SourceNode;
}

export interface OperatorNodeOperatorConfig {
  boot: (param: unknown) => OperatorNode;
}

export interface WatcherNodeOperatorConfig {
  boot: (param?: unknown) => WatcherNode;
}
