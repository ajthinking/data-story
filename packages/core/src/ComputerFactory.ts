import { Computer, PortName } from './types/Computer';
import { ComputerConfig } from './types/ComputerConfig';
import { DefaultParams } from './Param';
import { PortWithSchema } from './types/PortWithSchema';

/**
 * Ensure all inputs/outputs are PortWithSchema
 */
const portableToPortWithSchema = (portable: PortName | PortWithSchema): PortWithSchema => {
  return typeof portable === 'string'
    ? ({ name: portable, schema: {} })
    : portable;
}

export const ComputerFactory = {
  fromComputerConfig(config: ComputerConfig): Computer {
    return {
      name: config.name ?? 'unnamed',
      label: config.label ?? config.name ?? 'unlabeled',
      category: config.category,
      inputs: config.inputs?.map(portableToPortWithSchema) ?? [],
      outputs: config.outputs?.map(portableToPortWithSchema) ?? [],
      params: config.params
        ? { ...DefaultParams, ...config.params}
        : { ...DefaultParams },
      tags: config.tags ?? [],
      run: config.run ?? (async function*() {}),
      canRun: config.canRun,
    };
  }
}