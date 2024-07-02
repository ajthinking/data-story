import { PortProvider, SourceElement } from '../circuitElement';

export type CreateSourceOutputPort = () => PortProvider;

export class Source implements SourceElement {

  elementType = 'source' as const;

  constructor(private createOutputPort: CreateSourceOutputPort, public elementName: string) {
  }

  getOutput(): PortProvider {
    return this.createOutputPort();
  }

}
