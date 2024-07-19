import axios from 'axios';
import { Computer } from '../types/Computer';
import { json_, str } from '../Param';
import { get } from '../utils/get';

export const RequestLoopByToken: Computer = {
  name: 'RequestLoopByToken',
  label: 'RequestLoopByToken',
  tags: [],
  inputs: [],
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
      value: 'http://localhost:3009/users',
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
      value: JSON.stringify({
        headers: {}
      }, null, 2),
      multiline: true,
    }),
    str({
      name: 'item_path',
      help: 'Path to the items in the response data.',
      value: 'results',
    }),
    str({
      name: 'limit',
      help: 'How many items to request in each batch.',
      value: '25',
    }),
    str({
      name: 'cursorToken',
      help: 'the token to use for pagination',
      value: '0',
    }),
  ],

  canRun({ isAvailable }) {
    return isAvailable()
  },

  async* run({ input, output, params }) {
    const [incoming] = input.pullNew();
    const { url, method, body, config, item_path, limit, cursorToken } = incoming.params as {
      url: string,
      method: string,
      body: any,
      config: any,
      item_path: any,
      limit: string,
      cursorToken: string,
    };

    // localStorage.setItems('cursorToken', cursorToken);
    let currentOffset: number | string = cursorToken;

    let currentUrl = `${url}?after=${currentOffset}&limit=${limit}`;
    console.log('Requesting:', currentUrl)
    try {
      let response;
      if (method === 'GET') {
        response = await axios.get(currentUrl, config);
      } else if (method === 'POST') {
        response = await axios.post(currentUrl, body, config);
      } else {
        throw new Error(`Unsupported method: ${method}`);
      }

      const items = get(response.data, item_path);
      const pagination = get(response.data, 'paging');

      output.pushTo('items', items);
      output.pushTo('response', [pagination]);

      yield;

      const nextOffset: number | string | null = items.length == limit ?
        Number(currentOffset) + Number(limit) :
        null;

      if (nextOffset) {
        currentOffset = nextOffset;
      } else {
      }

      console.log({
        items: items.length,
        limit,
        currentOffset,
        nextOffset,
      })
    } catch(error: any) {
      console.log(error)
      output.pushTo('error', [error]);
    }
  }

};
