import { Diagram } from '@data-story/core'
import { ReactFlowJsonObject } from '@xyflow/react'

export const ReactFlowFactory = {
  fromDiagram(diagram: Diagram): ReactFlowJsonObject<any, any> {
    return {
      nodes: diagram.nodes.map(node => {
        return {
          minWidth: 128,
          height: 52,
          id: node.id,
          position: {
            x: node.position!.x,
            y: node.position!.y,
          },
          data: {
            params: node.params,
            computer: node.name,
            label: (node?.label || node.name) as string,
            inputs: node.inputs,
            outputs: node.outputs,
          },
          type: (() => {
            if (node.name === 'Comment') return 'commentNodeComponent';
            if (node.name === 'Input') return 'inputNodeComponent';
            if (node.name === 'LoopBack') return 'loopBackComponent';
            if (node.name === 'LoopStart') return 'loopStartComponent';
            if (node.name === 'Output') return 'outputNodeComponent';
            if (node.name === 'Table') return 'tableNodeComponent';
            if (node.name === 'ConsoleLog') return 'consoleNodeComponent';

            return 'nodeComponent';
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
  },
}
