import { Computer } from '../types/Computer';
import { multiline } from '../utils/multiline';
import { sleep } from '../utils/sleep';

export const Fake: Computer = {
  name: 'Fake',
  label: 'Fake',
  inputs: [],
  outputs: [],
  params: [],

  canRun({ isAvailable }) {
    return isAvailable();
  },

  async *run({ input, output, params, node }) {
    const isCreatorNode = node.inputs.length === 0

    console.log(node.inputs)

    while(true) {
      if(isCreatorNode) {
        await sleep(50)

        node.outputs.forEach(outputPort => {
          output.pushTo(outputPort.name, [
            {},
          ])
        })

        yield;
      }

      if(!isCreatorNode) {
        node.inputs.forEach(inputPort => {
          try {
            const [ item ] = input.pullFrom(inputPort.name, 1)
          } catch(e) {
            // ignoring
          }
        })

        await sleep(50)

        node.outputs.forEach(outputPort => {
          output.pushTo(outputPort.name, [{}])
        })

        yield;
      }
    }
  },
};
