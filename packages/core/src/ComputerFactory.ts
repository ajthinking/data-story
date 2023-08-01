import { ComputerConfig } from './types/ComputerConfig';
import { DefaultParams } from './Param';
import { AbstractPort, Port, PortName } from './types/Port';
import { Computer } from './types/Computer';

/**
 * Ensure all inputs/outputs are Port
 */
const portableToPort = (portable: PortName | AbstractPort): AbstractPort => {
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
      inputs: config.inputs?.map(portableToPort) ?? [],
      outputs: config.outputs?.map(portableToPort) ?? [],
      params: config.params
        ? { ...DefaultParams, ...config.params}
        : { ...DefaultParams },
      tags: config.tags ?? [],
      run: config.run ?? (async function*() {}),
      canRun: config.canRun,
    };
  }
}


/*
  ComputerConfigFactory: Creating a unique ComputerConfig
  ComputerConfig: Serializeable
  Computer: The Instance
*/