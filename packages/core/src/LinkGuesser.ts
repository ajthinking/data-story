import { Diagram } from './Diagram';
import { Link } from './types/Link';
import { Node } from './types/Node';
import { createDataStoryId } from './utils/createDataStoryId';

export class LinkGuesser {
  constructor(
    public diagram: Diagram,
  ) {}

  guess(
    node: Node,
  ): Link | null {
    const previousNode = this.diagram.nodes.at(-1)
    if(!previousNode) return null;

    const firstOutput = previousNode.outputs.at(0)
    if(!firstOutput) return null;

    const firstInput = node.inputs.at(0)
    if(!firstInput) return null;

    return {
      id: createDataStoryId(),
      sourcePortId: firstOutput.id,
      targetPortId: firstInput.id,
    }
  }
}