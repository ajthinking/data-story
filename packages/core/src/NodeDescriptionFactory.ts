import { Diagram } from './Diagram';
import { Computer } from './types/Computer';
import { NodeDescription } from './types/NodeDescription';

export const NodeDescriptionFactory = {
  fromComputer: (computer: Computer): NodeDescription => {
    return {
      name: computer.name,
      docs: computer.docs,
      label: computer.label,
      category: computer.category,
      inputs: computer.inputs,
      outputs: computer.outputs,
      params: computer.params,
      tags: computer.tags,
    }
  },

  fromDiagram: (name: string, diagram: Diagram): NodeDescription => {
    return {
      name,
      label: name,
      category: undefined,
      inputs: diagram.nodes
        .filter(node => node.type === 'Input')
        .map(node => ({
          name: 'input',
          schema: {}
        })),
      outputs: diagram.nodes
        .filter(node => node.type === 'Output')
        .map(node => ({
          name: 'output',
          schema: {}
        })),
      params: diagram.params,
      tags: [], // TODO
    }
  }
}