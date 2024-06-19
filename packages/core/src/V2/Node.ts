import { Observable } from 'rxjs';

interface NodePorts {
  getPort(portName: string): Observable<unknown>;
}

interface SourceNode {
  getOutput(): NodePorts;
}

interface OperatorNode {
  getOutput(inputs: NodePorts): NodePorts;
}

interface WatcherNode {
  watch(inputs: NodePorts): void;
}
