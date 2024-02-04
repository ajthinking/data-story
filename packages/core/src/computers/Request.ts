import axios from 'axios';
import { ComputerConfig } from '../types/ComputerConfig';
import { json_, str } from '../Param';
import Hjson from '@data-story/hjson';

export const Request: ComputerConfig = {
  name: 'Request',
  inputs: ['input'],
  outputs: ['items', 'response', 'error'],
  params: [
    str({
      name: 'url',
      value: 'https://jsonplaceholder.typicode.com/todos',
    }),
    str({
      name: 'method',
      value: 'GET',
    }),
    json_({
      name: 'body',
      value: '{}',
      multiline: true,
    }),
    json_({
      name: 'config',
      value: JSON.stringify({ headers: {}}, null, 2),
      multiline: true,
    }),
  ],

  async *run({ input, output, params }) {
    while(true) {
      const [ incoming ] = input.pull(1)
      const { url, method, body, config } = incoming.params as {
        url: string,
        method: string,
        body: any,
        config: any,
      }

      if(method === 'GET') {
        const response = await axios.get(url, config)
        output.pushTo('items', await response.data)
      }

      if(method === 'POST') {
        const response = await axios.post(url, body, config)
        output.pushTo('items', await response.data)
      }

      yield;
    }
  },
};
