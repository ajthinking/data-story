import axios from 'axios';
import { json_, str } from '../Param';
import { get } from '../utils/get';
import { Computer } from '../types/Computer';

export const RequestLoopByOffset: Computer = {
  name: 'RequestLoopByOffset',
  label: 'RequestLoopByOffset',
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
      value: 'https://dummyjson.com/todos',
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
      value: 'todos',
    }),
    str({
      name: 'offset_name',
      help: 'Name of URL parameter to use for offset.',
      value: 'skip',
    }),
    str({
      name: 'limit',
      help: 'How many items to request in each batch.',
      value: '25',
    }),
    str({
      name: 'start_offset',
      help: 'The offset to start iteration from.',
      value: '0',
    }),
  ],

  canRun({ isAvailable }) {
    return isAvailable()
  },

  async *run({ input, output, params }) {
    const [ incoming ] = input.pullNew();
    const { url, method, body, config, item_path, offset_name, start_offset, limit } = incoming.params as {
      url: string,
      method: string,
      body: any,
      config: any,
      item_path: any,
      offset_name: string,
      limit: string,
      start_offset: string,
    };

    let currentOffset: number | string = start_offset;
    let hasNextPage = true;

    while (hasNextPage) {
      let currentUrl = `${url}?${offset_name}=${currentOffset}&limit=${limit}`;
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

        output.pushTo('items', items);
        output.pushTo('response', [response]);

        yield;

        const nextOffset: number | string | null = items.length == limit ?
          Number(currentOffset) + Number(limit) :
          null;

        if (nextOffset) {
          currentOffset = nextOffset;
          hasNextPage = true;
        } else {
          hasNextPage = false;
        }

        console.log({
          items: items.length,
          limit,
          currentOffset,
          nextOffset,
          hasNextPage,
        })
      } catch (error: any) {
        console.log(error)
        output.pushTo('error', [error]);
        hasNextPage = false;
      }
    }

    yield;
  },
};
