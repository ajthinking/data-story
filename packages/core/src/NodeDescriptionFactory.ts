import { Diagram } from './Diagram';
import { StringableInputValue } from './Param';
import { Computer } from './types/Computer';
import { NodeDescription } from './types/NodeDescription';

export const NodeDescriptionFactory = {
  fromComputer: (computer: Computer): NodeDescription => {
    return {
      name: computer.name,
      label: computer.label,
      category: computer.category,
      inputs: computer.inputs,
      outputs: computer.outputs,
      params: computer.params,
    }
  },

  fromDiagram: (name: string, diagram: Diagram): NodeDescription => {
    return {
      name,
      label: name,
      category: undefined,
      inputs: diagram.nodes
        .filter(node => node.name === 'Input')
        .map(node => {
          //@ts-ignore
          const portParam = node.params
            .find(param => param.name === 'port_name')! as StringableInputValue

          const portName = portParam.input.rawValue;
          console.log('[data-story] todo-bug portName', portName);

          return {
            name: portName,
            schema: {},
          }
        }),
      outputs: diagram.nodes
        .filter(node => node.name === 'Output')
        .map(node => {
          //@ts-ignore
          const portParam = node.params
            .find(param => param.name === 'port_name')! as StringableInputValue

          const portName = portParam.input.rawValue;
          console.log('[data-story] todo-bug portName', portName);

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