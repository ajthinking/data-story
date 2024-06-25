import { Observable, Subscription, SubscriptionLike } from 'rxjs';

export interface PortProvider {
  getPort(portName: string): Observable<unknown>;
}

export interface ISourceNode {
  getOutput(): PortProvider;
  nodeType: 'source';
}

export interface IOperatorNode {
  getOutput(inputs: PortProvider): PortProvider;
  nodeType: 'operator';
}

export type WatcherEvent = 'completed' | 'errored';

export interface IWatcherResult {
  subscription: SubscriptionLike;
  readonly events: Observable<WatcherEvent>;
}
export interface IWatcherNode {
  watch(inputs: PortProvider): IWatcherResult;
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
