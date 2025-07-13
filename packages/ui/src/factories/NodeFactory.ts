import { Node, PositionGuesser, createDataStoryId } from '@data-story/core';
import { ReactFlowNode } from '../components/Node/ReactFlowNode';
import { Diagram, NodeDescription } from '@data-story/core';

export const NodeFactory = {
  fromReactFlowNode: (flowNode: ReactFlowNode): Node => {
    return {
      id: flowNode.id,
      type: flowNode.data.computer,
      label: flowNode.data.label,
      inputs: flowNode.data.inputs.map(input => {
        return {
          id: input.id,
          name: input?.name,
          schema: input.schema,
        }
      }),
      outputs: flowNode.data.outputs.map(output => {
        return {
          id: output.id,
          name: output?.name,
          schema: output.schema,
        }
      }),
      params: flowNode.data.params || [],
      position: flowNode.position,
    }
  },
  fromNodeDescription(
    nodeDescription: NodeDescription,
    diagram: Diagram,
  ): Node {
    const id = `${nodeDescription.type}.${createDataStoryId()}`;

    return structuredClone({
      id,
      type: nodeDescription.type,
      label: nodeDescription.label,
      inputs: nodeDescription.inputs.map(input => {
        return {
          id: `${id}.${input.name}`,
          name: input.name,
          schema: input.schema,
        }
      }),
      outputs: nodeDescription.outputs.map(output => {
        return {
          id: `${id}.${output.name}`,
          name: output.name,
          schema: output.schema,
        }
      }),
      params: nodeDescription.params || [],
      position: new PositionGuesser(diagram).guess(nodeDescription),
    })
  },
}
