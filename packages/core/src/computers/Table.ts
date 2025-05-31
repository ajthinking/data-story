import { num, str, strList } from '../Param';
import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const Table: Computer = {
  name: 'Table',
  label: 'Table',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [],
  params: [
    str({
      name: 'only',
      help: 'If set, only the specified paths will be shown. Use comma separation',
      value: '',
    }),
    str({
      name: 'drop',
      help: 'If set, the specified paths will be dropped. Use comma separation',
      value: '',
    }),
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
