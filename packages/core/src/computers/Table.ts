import { num, str, strList } from '../Param';
import { Computer } from '../types/Computer';

export const Table: Computer = {
  name: 'Table',
  label: 'Table',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [],
  params: [
    strList({
      name: 'only',
      help: 'If set, only the specified paths will be shown. Use comma separation',
      input: '',
    }),
    strList({
      name: 'drop',
      help: 'If set, the specified paths will be dropped. Use comma separation',
      input: '',
    }),
    str({
      name: 'destructObjects',
      help: 'If set, objects will be destructured',
      input: 'true',
    }),
  ],

  async* run({ input }) {
    while(true) {
      input.pull()
      yield;
    }
  },
};
