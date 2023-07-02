import axios from 'axios';
import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { json, select, string } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Request: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Request',
  outputs: ['items', 'response', 'error'],
  params: {
    url: string('url').value('https://jsonplaceholder.typicode.com/todos').get(),
    method: select('method').options(['GET', 'POST', 'PUT', 'DELETE']).get().value('GET'),
    body: json('body').value('{}').get(),
    config: json('config').value('{}').get(),
    // itemPath: string('itemPath').value('data').get(),
  },

  async *run({ output, params: { url, method, body, config } }) {
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
});
