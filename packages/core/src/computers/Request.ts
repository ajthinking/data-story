import axios from 'axios';
import { json_, str } from '../Param';
import { get } from '../utils/get';
import { Computer } from '../types/Computer';
import { asArray } from '../utils/asArray';

interface SerializedHttpResponse {
  status: number;
  statusText: string;
  headers: any;
  data: any;
  config: any;
  request?: {
    responseURL?: string;
    method?: string;
  };
}

interface SerializedHttpError {
  message: string;
  name: string;
  response?: {
    status: number;
    statusText: string;
    headers: any;
    data: any;
  };
  request?: {
    responseURL?: string;
    method?: string;
  };
  config?: any;
}

async function requestAndSerialize(
  method: string,
  url: string,
  body: any,
  config: any,
  item_path: any,
  get: (obj: any, path: any) => any,
  asArray: (input: any) => any[],
): Promise<{
    response?: SerializedHttpResponse,
    items?: any[],
    error?: SerializedHttpError,
  }> {
  try {
    let response;
    if(method === 'GET') {
      response = await axios.get(url, config)
    } else if(method === 'POST') {
      response = await axios.post(url, body, config)
    } else {
      throw new Error(`Unsupported method: ${method}`)
    }
    const serializedResponse: SerializedHttpResponse = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      config: response.config,
      request: response.request ? {
        responseURL: response.request.responseURL,
        method: response.request.method,
      } : undefined,
    }
    const itemables = get(response.data, item_path)
    const items = asArray(itemables)
    return { response: serializedResponse, items }
  } catch (err) {
    const error = err as any
    let errorInfo: SerializedHttpError = {
      message: error.message,
      name: error.name,
    }
    if (error.response) {
      errorInfo.response = {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: error.response.data,
      }
    }
    if (error.request) {
      errorInfo.request = {
        responseURL: error.request.responseURL,
        method: error.request.method,
      }
    }
    if (error.config) {
      errorInfo.config = error.config
    }
    return { error: errorInfo }
  }
}

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
      value: JSON.stringify({ headers: {} }, null, 2),
      multiline: true,
    }),
    str({
      name: 'item_path',
      help: 'Path to the items in the response data.',
      value: '',
    }),
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
      const result = await requestAndSerialize(method, url, body, config, item_path, get, asArray)
      if (result.response) {
        output.pushTo('response', [result.response])
      }
      if (result.items) {
        output.pushTo('items', result.items)
      }
      if (result.error) {
        output.pushTo('error', [result.error])
      }
      yield;
    }
  },
};
