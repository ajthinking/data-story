import { PortProvider, SourceNode } from '../Node';

export type CreateSourceOutputPort = () => PortProvider;

export class Source implements SourceNode {

  nodeType = 'source' as const;

  constructor(private createOutputPort: CreateSourceOutputPort) {
  }

  getOutput(): PortProvider {
    return this.createOutputPort();
  }

}
