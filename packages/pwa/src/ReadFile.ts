import { ComputerConfig, ComputerFactory } from "@data-story/core";

export const ReadFile: ComputerConfig = {
  name: 'ReadFile',
  inputs: [],
  outputs: [],
  params: [
    {
      name: 'path',
      label: 'Path',
      help: 'Path to file',
      inputMode: {
        type: 'Stringable',
        multiline: false,
        canInterpolate: false,
        interpolate: false,
        evaluations: [],
        casts: [],
        value: '',
      },
      alternativeInputModes: [],
    }
  ],

  // eslint-disable-next-line no-empty-pattern
  async *run({}) {},
};

export const ReadComputer = new ComputerFactory().get(ReadFile);




