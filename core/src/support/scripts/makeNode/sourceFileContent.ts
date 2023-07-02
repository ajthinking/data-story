export const sourceFileContent = (name: string) => `import { Computer, ComputerConfigFactory } from '../../types/Computer';

export const ${name}: ComputerConfigFactory = (): Computer => ({
  name: '${name}',
  inputs: [{
    name: 'input',
    schema: 'any',
  }],
  outputs: ['output'],

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull()
      output.push(incoming)

      yield;
    }
  },
});
`;