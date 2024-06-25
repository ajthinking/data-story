import { Observable, SubscriptionLike } from 'rxjs';

export interface PortProvider {
  getPort(portName: string): Observable<unknown>;
}

export interface SourceNode {
  nodeType: 'source';

  getOutput(): PortProvider;
}

export interface OperatorNode {
  nodeType: 'operator';

  getOutput(inputs: PortProvider): PortProvider;
}

export type WatcherEvent = 'completed' | 'errored';

export interface IWatcherResult {
  subscription: SubscriptionLike;
  readonly events: Observable<WatcherEvent>;
}

export interface WatcherNode {
  nodeType: 'watcher';

  watch(inputs: PortProvider): IWatcherResult;
}

/**
 * Provides a simple way to create a computer
 */

export interface ISourceNodeConfig {
  boot: (param: unknown) => SourceNode;
}

export interface IOperatorNodeConfig {
  boot: (param: unknown) => OperatorNode;
}

export interface IWatcherNodeConfig {
  boot: (param?: unknown) => WatcherNode;
}
