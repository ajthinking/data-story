import { AbstractPort, PortName } from './types/Port';
import { Computer } from './types/Computer';

/**
 * Ensure all inputs/outputs are Port
 */
const portableToPort = (portable: PortName | AbstractPort): AbstractPort => {
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
        docs: template.docs,
        category: template.category,
        inputs: template.inputs?.map(portableToPort) ?? [],
        outputs: template.outputs?.map(portableToPort) ?? [],
        params: template.params ?? [],
        tags: template.tags ?? [],
      }),
      // Methods
      run: template.run ?? (async function*() {}),
      canRun: template.canRun,
    };
  }
}