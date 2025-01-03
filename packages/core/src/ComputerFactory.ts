import { AbstractPort, PortName } from './types/Port';
import { Computer } from './types/Computer';

/**
 * Ensure all inputs/outputs are Port
 */
export const portableToPort = (portable: PortName | AbstractPort): AbstractPort => {
  return typeof portable === 'string'
    ? ({ name: portable, schema: {} })
    : portable;
}

export class ComputerFactory {
  getInstance(template: Computer): Computer {
    return {
      // Properties
      ...structuredClone({
        name: template.name ?? 'unnamed',
        label: template.label ?? template.name ?? 'unlabeled',
        category: template.category,
        inputs: template.inputs?.map(portableToPort) ?? [],
        outputs: template.outputs?.map(portableToPort) ?? [],
        params: template.params ?? [],
      }),
      // Methods
      run: template.run ?? (async function*() {}),
      canRun: template.canRun,
    };
  }
}