import { Observable, Subscription, SubscriptionLike } from 'rxjs';

export interface INodePorts {
  getPort(portName: string): Observable<unknown>;
}

export interface ISourceNode {
  getOutput(): INodePorts;
  nodeType: 'source';
}

export interface IOperatorNode {
  getOutput(inputs: INodePorts): INodePorts;
  nodeType: 'operator';
}

export type WatcherEvents = 'completed' | 'errored';

export interface IWatcherResult {
  subscription: SubscriptionLike;
  readonly events: Observable<WatcherEvents>;
}
export interface IWatcherNode {
  watch(inputs: INodePorts): IWatcherResult;
  nodeType: 'watcher';
}
/**
 * Provides a simple way to create a computer
 */

export interface ISourceNodeConfig {
  boot: (param: unknown) => ISourceNode ;
}

export interface IOperatorNodeConfig {
  boot: (param: unknown) => IOperatorNode;
}

export interface IWatcherNodeConfig {
  boot: (param?: unknown) => IWatcherNode;
}
