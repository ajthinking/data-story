import { Computer } from './types/Computer';
import { NodeDescription } from './NodeDescription';

export const NodeDescriptionFactory = {
  fromComputer: (computer: Computer): NodeDescription => {
    return {
      name: computer.name,
      label: computer.label,
      category: computer.category,
      inputs: computer.inputs,
      outputs: computer.outputs,
      params: computer.params,
      tags: computer.tags,
    }
  },

  fromSavedFlow: (flow: string): NodeDescription => {
    const computer = flow as any // TODO

    return {
      name: flow,
      label: flow,
      category: flow,
      inputs: [{
        name: 'input',
        schema: {}
      }],
      outputs: [{
        name: 'output',
        schema: {}
      }],
      params: {},
      tags: [],
    }    
  }
}