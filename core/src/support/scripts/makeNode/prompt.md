Come up with a new computer with name __NAME__. Use the examples below for inspiration. Reply with NOTHING but the code. No backticks or explanation or anything. Trim initial whitespace.

### Example
import { Computer, ComputerFactory, RunArgs } from '../../Computer';
import { DefaultParams } from '../../Param';

export const Pass: ComputerFactory = (): Computer => ({
  name: 'Pass',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
  },
  
  async *run({ input, output }) {
    while(true) {
      const incoming = input!.pull()
      output.push(incoming)

      yield;
    }
  },
});

### Example
import axios from 'axios';
import { Computer, ComputerFactory, RunArgs } from '../../Computer';
import { DefaultParams } from '../../Param';
import { json, select, string } from '../../ParamBuilder';

export const Request: ComputerFactory = (): Computer => ({
  name: 'Request',
  outputs: ['items', 'response', 'error'],
  params: {
    ...DefaultParams,
    url: string('url').value('https://jsonplaceholder.typicode.com/todos').get(),
    method: select('method').options(['GET', 'POST', 'PUT', 'DELETE']).get().value('GET'),
    body: json('body').value('{}').get(),
    config: json('config').value('{}').get(),
    featurePath: string('featurePath').value('data').get(),
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

### Example
import { Computer, ComputerFactory, RunArgs } from '../../Computer';
import { DefaultParams } from '../../Param';

export const Log: ComputerFactory = (): Computer => ({
  name: 'Log',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  async *run({ input, output }) {
    while(true) {
      // log the *item* - not ItemWithParams
      const incoming = input.pull().map(i => i.value)
      
      console.log(JSON.stringify(incoming, null, 2))
      console.groupEnd()

      yield;
    }
  },
});

### Example
import { Computer, ComputerFactory, RunArgs } from '../../Computer';
import { ItemWithParams } from '../../ItemWithParams';
import { DefaultParams } from '../../Param';
import { string } from '../../ParamBuilder';
import { ObjectItemValue } from '../../ItemValue';

export const CreateAttribute: ComputerFactory = (): Computer => ({
  name: 'CreateAttribute',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    key: string('key').get(),
    value: string('value').get(),
  },

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull() as ItemWithParams<ObjectItemValue>[]
      output.push(incoming.map(item => {
        item.value[item.params.key] = item.params.value
        return item
      }))

      yield;
    }
  },
});

### Example
import { Computer, ComputerFactory, RunArgs } from '../../Computer';
import { DefaultParams } from '../../Param';
import { json } from '../../ParamBuilder';

export const CreateJson: ComputerFactory = (): Computer => ({
  name: 'CreateJson',  
  outputs: ['output'],
  params: {
    ...DefaultParams,
    json: json('json').value(`[{ "name": "John"}]`).get(),
  },

  async *run({ output, params: { json } }) {
    try {
      const parsed = JSON.parse(json)
      output.push(
        // wraps the parsed json in an array if it's not already an array
        [parsed].flat()
      )
    } catch(error) {
      throw error;
    }
  },
});

### Example
import { Computer, ComputerFactory, RunArgs } from '../../Computer';
import { DefaultParams } from '../../Param';

export const DumpJson: ComputerFactory = (): Computer => ({
  name: 'DumpJson',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  // canRun({ input }) {
  //   return input.hasAllItems()
  // },

  async *run({ input, storage }) {
    const id = (Math.random() + 1).toString(36).substring(7);
    const key = `${this.name}-${id}`

    storage?.putExecutionItems(key, input.pull())
  },
});

### Example
import { Computer, ComputerFactory, RunArgs } from '../../Computer';
import { DefaultParams } from '../../Param';

export const Ignore: ComputerFactory = (): Computer => ({
  name: 'Ignore',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  async *run({ input }) {
    while(true) {
      input.pull()
      yield;
    }
  },
});

### Example
import { Computer, ComputerFactory, RunArgs } from '../../Computer';
import { ObjectItemValue } from '../../ItemValue';
import { DefaultParams } from '../../Param';
import { string } from '../../ParamBuilder';

export const Merge: ComputerFactory = (): Computer => ({
  name: 'Merge',
  inputs: ['requestors', 'suppliers'],
  outputs: [
    'merged',
    'not_merged',
  ],
  params: {
    ...DefaultParams,
    requestor_merge_property: string('requestor_merge_property').get(),
    supplier_merge_property: string('supplier_merge_property').get(),
  },

  canRun({ isAvailable, input }) {
    console.log({
      type: 'Can Merge run?',
      isAvailable: isAvailable(),
      requestors: input.haveItemsAtInput('requestors'),
      suppliers: input.haveAllItemsAtInput('suppliers')
    })

    return [
      isAvailable(),
      input.haveItemsAtInput('requestors'),
      input.haveAllItemsAtInput('suppliers')
    ].every(Boolean)
  },

  async *run({ input, output, params }) {
    while(true) {
      // For now use default heuristics which awaits all ports to be complete

      // No interpolation - extract underlying item form ItemWithParams
      const requestors = input.pullFrom('requestors').map(i => i.value) as ObjectItemValue
      const suppliers = input.pullFrom('suppliers').map(i => i.value) as ObjectItemValue

      for(const requestor of requestors) {
        const requestorKey = params.requestor_merge_property
        const requestorValue: any = requestor[requestorKey] as any

        const supplierKey = params.supplier_merge_property
        const supplierMatch = suppliers.find(supplier => {
          return supplier[supplierKey] === requestorValue
        })
        
        if (supplierMatch) {
          const merged = { ...requestor, ...supplierMatch }
          output.pushTo('merged', [merged])
        } else {
          output.pushTo('not_merged', [requestor])
        }
      }

      yield;
    }
  },
});

### Example
import { Computer, ComputerFactory, RunArgs } from '../../Computer';
import { DefaultParams } from '../../Param';
import { number } from '../../ParamBuilder';
import { sleep } from '../../utils/sleep';

export const Signal: ComputerFactory = (): Computer => ({
  name: 'Signal',
  inputs: [],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    period: number('period').value(50).get(),
    count: number('count').value(500).get(),
  },

  async *run({
    output,
    params: { period, count}
  }) {
    let i = 1;

    while(i <= count) {
      await sleep(period)
      output.push([{
        id: i++
      }])

      yield;
    }
  },
});

### Example
import { Computer, ComputerFactory, RunArgs } from '../../Computer';
import { DefaultParams } from '../../Param';
import { number } from '../../ParamBuilder';
import { sleep } from '../../utils/sleep';

export const Sleep: ComputerFactory = (): Computer => ({
  name: 'Sleep',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    duration: number('duration').value(100).get()
  },

  async *run({ input, output }) {
    while(true) {
      const [ { value, params: { duration } } ] = input.pull(1)
      await sleep(duration)
      output.push([value])

      yield;
    }
  },
});

### Example
import { Computer, ComputerFactory, RunArgs } from '../../Computer';
import { DefaultParams } from '../../Param';
import { sleep } from '../../utils/sleep';

export const Throw: ComputerFactory = (): Computer => ({
  name: 'Throw',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  async *run({ input }) {
    input.pull()
    throw Error('Some error')
  },
});