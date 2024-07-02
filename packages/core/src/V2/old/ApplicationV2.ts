import { Diagram } from '../../Diagram';
import { Builder } from './Builder';
import { Element } from './Element';
import { execute } from './execute';

export class ApplicationV2 {
  constructor(private availableElements: Element[]) {}

  getAvailableElements() {
    return this.availableElements;
  }

  getBuilder() {
    return new Builder(this.availableElements);
  }

  getExecutor() {
    return (diagram: Diagram) => execute(diagram, this);
  }
}
