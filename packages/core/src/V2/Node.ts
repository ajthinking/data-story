import { Observable } from 'rxjs';

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

export interface IWatcherNode {
  watch(inputs: INodePorts): void;
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
