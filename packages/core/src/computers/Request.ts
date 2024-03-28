import axios from 'axios';
import { ComputerConfig } from '../types/ComputerConfig';
import { json_, str } from '../Param';
import Hjson from '@data-story/hjson';
import { get } from '../utils/get';

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
    str({
      name: 'item_path',
      help: 'Path to the items in the response data.',
      value: '',
    })
  ],

  async *run({ input, output, params }) {
    while(true) {
      const [ incoming ] = input.pull(1)
      const { url, method, body, config, item_path } = incoming.params as {
        url: string,
        method: string,
        body: any,
        config: any,
        item_path: any
      }

      if(method === 'GET') {
        const response = await axios.get(url, config)
        const items = get(response.data, item_path)
        output.pushTo('items', items)
      }

      if(method === 'POST') {
        const response = await axios.post(url, body, config)
        const items = get(response.data, item_path)
        output.pushTo('items', items)
      }

      yield;
    }
  },
};
