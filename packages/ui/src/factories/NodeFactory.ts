import { Node } from '@data-story/core';
import { ReactFlowNode } from '../components/Node/ReactFlowNode';

export const NodeFactory = {
  fromReactFlowNode: (flowNode: ReactFlowNode): Node => {
    return {
      id: flowNode.id,
      type: flowNode.data.computer,
      docs: flowNode.data.docs,
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
  }
}