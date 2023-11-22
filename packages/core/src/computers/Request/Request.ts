import axios from 'axios';

import { json, select, string } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';
import { json_, str } from '../../Param';

export const Request: ComputerConfig = {
  name: 'Request',
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
    }),
    json_({
      name: 'config',
      value: '{}',     
    }),    
  ],

  async *run({ output, params }) {
    const { url, method, body, config } = params as {
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
    
    yield
  },
};
