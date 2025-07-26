import { Diagram } from './Diagram';
import { StringableInputValue } from './Param';
import { Computer } from './types/Computer';
import { NodeDescription } from './types/NodeDescription';

export const NodeDescriptionFactory = {
  fromComputer: (computer: Computer): NodeDescription => {
    return {
      type: 'NodeDescription',
      computerType: computer.computerType,
      label: computer.label,
      category: computer.category,
      inputs: computer.inputs,
      outputs: computer.outputs,
      params: computer.params,
    }
  },

  fromDiagram: (name: string, diagram: Diagram): NodeDescription => {
    return {
      type: 'NodeDescription',
      computerType: name,
      label: name,
      category: undefined,
      inputs: diagram.nodes
        .filter(node => node.type === 'Input')
        .map(node => {
          //@ts-ignore
          const portParam = node.params
            .find(param => param.name === 'port_name')!

          const portName = portParam.input.rawValue;

          return {
            name: portName,
            schema: {},
          }
        }),
      outputs: diagram.nodes
        .filter(node => node.type === 'Output')
        .map(node => {
          //@ts-ignore
          const portParam = node.params
            .find(param => param.name === 'port_name')!

          const portName = portParam.input.rawValue;

          return {
            name: portName,
            schema: {},
          }
        }),
      params: diagram.params,
      // TODO
    }
  },
}