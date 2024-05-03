import { Diagram } from '@data-story/core'
import { ReactFlowJsonObject } from 'reactflow'

export const ReactFlowFactory = {
  fromDiagram(diagram: Diagram): ReactFlowJsonObject<any, any> {
    return {
      nodes: diagram.nodes.map(node => {
        return {
          width: 128,
          height: 52,
          id: node.id,
          position: {
            x: node.position!.x,
            y: node.position!.y
          },
          data: {
            docs: node.docs,
            params: node.params,
            computer: node.type,
            label: (node?.label || node.type) as string,
            inputs: node.inputs,
            outputs: node.outputs,
          },
          type: (() => {
            if (node.type === 'Comment') return 'commentNodeComponent';
            if (node.type === 'Input') return 'inputNodeComponent';
            if (node.type === 'Output') return 'outputNodeComponent';
            if (node.type === 'Table') return 'tableNodeComponent';

            return 'nodeComponent'
          })(),
        }
      }),
      edges: diagram.links.map(link => {
        return {
          sourceHandle: link.sourcePortId,
          targetHandle: link.targetPortId,
          source: diagram.nodes.find(node => node.outputs.find(output => output.id === link.sourcePortId) !== undefined)!.id,
          target: diagram.nodes.find(node => node.inputs.find(input => input.id === link.targetPortId) !== undefined)!.id,
          id: link.id,
          label: link?.label,
          labelBgStyle: link?.labelBgStyle,
        }
      }),
      viewport: diagram.viewport,
    }
  }
}
