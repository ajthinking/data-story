import axios from 'axios';
import { json_, str } from '../Param';
import { get } from '../utils/get';
import { Computer } from '../types/Computer';
import { asArray } from '../utils/asArray';

export const Request: Computer = {
  name: 'Request',
  label: 'Request',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [
    {
      name: 'items',
      schema: {},
    },
    {
      name: 'response',
      schema: {},
    },
    {
      name: 'error',
      schema: {},
    },
  ],
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
        const itemables = get(response.data, item_path)
        const items = asArray(itemables)
        output.pushTo('items', items)
      }

      if(method === 'POST') {
        const response = await axios.post(url, body, config)
        const itemables = get(response.data, item_path)
        const items = asArray(itemables)
        output.pushTo('items', items)
      }

      yield;
    }
  },
};
