import axios from 'axios';
import { Computer } from '../types/Computer';
import { json_, str } from '../Param';
import { get } from '../utils/get';

export const RequestLoopByToken: Computer = {
  name: 'RequestLoopByToken',
  label: 'RequestLoopByToken',
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
      input: 'http://localhost:3009/users',
    }),
    str({
      name: 'method',
      input: 'GET',
    }),
    json_({
      name: 'body',
      input: '{}',
      multiline: true,
    }),
    json_({
      name: 'config',
      input: JSON.stringify({
        headers: {},
      }, null, 2),
      multiline: true,
    }),
    str({
      name: 'item_path',
      help: 'Path to the items in the response data.',
      input: 'results',
    }),
    str({
      name: 'cursor_path',
      help: 'Path to the cursor in the response data.',
      input: 'paging.next.after',
    }),
    str({
      name: 'limit',
      help: 'How many items to request in each batch.',
      input: '25',
    }),
    str({
      name: 'cursor_token',
      help: 'the token to use for pagination',
      input: '0',
    }),
  ],

  canRun({ isAvailable }) {
    return isAvailable()
  },

  async* run({ input, output, params }) {
    const [incoming] = input.pullNew();
    const { url, method, body, config, item_path, limit, cursor_token, cursor_path } = incoming.params as {
      url: string,
      method: string,
      body: any,
      config: any,
      item_path: any,
      limit: string,
      cursor_path: string,
      cursor_token: string,
    };

    let hasNextPage = true;
    let currentCursor = cursor_token;

    while(hasNextPage) {
      let currentUrl = currentCursor ? `${url}?after=${currentCursor}&limit=${limit}` : `${url}?limit=${limit}`;
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
        currentCursor = get(response.data, cursor_path);

        output.pushTo('items', items);
        output.pushTo('response', [response]);

        yield;

        hasNextPage = !!currentCursor;
      } catch(error: any) {
        console.log(error)
        output.pushTo('error', [error]);
      }
    }

    yield
  },

};
