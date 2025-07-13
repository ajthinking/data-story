import { str } from '../Param';
import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const Table: Computer = {
  type: 'Table',
  label: 'Table',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [],
  params: [
    {
      type: 'StringableParam',
      name: 'only',
      label: 'Only',
      multiline: true,
      canInterpolate: false,
      help: 'If set, only the specified paths will be shown. Use comma separation',
      input: {
        rawValue: '',
        Evaluation: 'STRING_LIST',
      },
      evaluations: [
        {
          type: 'STRING_LIST',
          label: 'list',
          shortLabel: 'list',
        },
      ],
    },
    {
      type: 'StringableParam',
      name: 'drop',
      label: 'Drop',
      multiline: true,
      canInterpolate: false,
      help: 'If set, the specified paths will be dropped. Use comma separation',
      input: {
        rawValue: '',
        Evaluation: 'STRING_LIST',
      },
      evaluations: [
        {
          type: 'STRING_LIST',
          label: 'list',
          shortLabel: 'list',
        },
      ],
    },
    str({
      name: 'destructObjects',
      help: 'If set, objects will be destructured',
      value: 'true',
    }),
  ],

  async* run({ input }) {
    while(true) {
      input.pull(BatchLimit)
      yield;
    }
  },
};
