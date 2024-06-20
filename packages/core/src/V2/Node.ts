import { Observable } from 'rxjs';

export interface NodePorts {
  getPort(portName: string): Observable<unknown>;
}

export interface ISourceNode {
  getOutput(): NodePorts;
  nodeType: 'source';
}

interface OperatorNode {
  getOutput(inputs: NodePorts): NodePorts;
  nodeType: 'operator';
}

interface WatcherNode {
  watch(inputs: NodePorts): void;
  nodeType: 'watcher';
}
/**
 * Provides a simple way to create a computer
 */

export interface SourceNodeConfig {
  boot: (param: unknown) => ISourceNode ;
}
