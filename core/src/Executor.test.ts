import { Diagram } from './Diagram';
import { Executor } from './Executor';
import { Computer, RunArgs } from './types/Computer';
import { DiagramBuilder } from './DiagramBuilder';
import { CreateJson, Ignore, Log, Signal, Throw } from './computers';;
import { NullStorage } from './NullStorage';
import { whenRunning } from './support/diagramExecutionTester/DiagramExecutionTester';
import { Link } from './types/Link';
import { Node } from './types/Node';
import { ItemValue } from './types/ItemValue';

describe('execute', () => {
  it('can execute an empty diagram and return an execution update', async () => {
    const diagram = new Diagram([], [])
    const computers = new Map<string, Computer>()

    const storage = new NullStorage()    

    const executor = new Executor(diagram, computers, storage)

    const updates = executor.execute()

    const update = await updates.next()
    expect(update.value).toMatchObject({
      type: 'ExecutionUpdate',
    })
    expect(update.done).toBe(false)
    
    const result = await updates.next()
    expect(result.done).toBe(true)
  })

  it('can execute a diagram with a single no-input no-output node', async () => {
    const node: Node = {
      id: 'node-id',
      type: 'Dummy',
      inputs: [],
      outputs: [],
      params: {}
    }

    const diagram = new Diagram([node], [])

    let proof = 'dummy-should-change-this'

    const computers = new Map<string, Computer>().set('Dummy', {
      async *run({}) {
        proof = 'dummy-rocks'
      },
    } as Computer)

    const storage = new NullStorage()    

    const executor = new Executor(diagram, computers, storage)

    const updates = executor.execute()
    const update1 = await updates.next()

    expect(update1.done).toBe(false)
    expect(proof).toBe('dummy-rocks')

    const update2 = await updates.next()
    expect(update2.done).toBe(false)

    const update3 = await updates.next()
    expect(update3.done).toBe(true)    
  })

  it('can execute a diagram with non connected input node', async () => {
    const node: Node = {
      id: 'node-id',
      type: 'Accepter',
      inputs: [{
          id: 'input-id',
          name: 'input',
      }],
      outputs: [],
      params: {}
    }

    const diagram = new Diagram([node], [])

    const computers = new Map<string, Computer>().set('Accepter', {
      async *run({ output }) {
        // do nothing
      },
    } as Computer)

    const storage = new NullStorage()

    const executor = new Executor(diagram, computers, storage)

    const updates = executor.execute()
    const update = await updates.next()
    expect(update.done).toBe(false)

    const result = await updates.next()
    expect(result.done).toBe(true)    
  })    

  it('can execute a diagram with a node outputting items', async () => {
    const node: Node = {
      id: 'zergling-spawner-id',
      type: 'Spawner',
      inputs: [],
      outputs: [
        {
          id: 'zergling-output-id',
          name: 'output',
        }
      ],
      params: {}
    }

    const diagram = new Diagram([node], [])

    const computers = new Map<string, Computer>().set('Spawner', {
      async *run({ output }) {
        output.push([{ type: 'Zergling' }])
      },
    } as Computer)

    const storage = new NullStorage()    

    const executor = new Executor(diagram, computers, storage)

    const updates = executor.execute()

    const update1 = await updates.next()
    expect(update1.done).toBe(false)

    const update2 = await updates.next()
    expect(update2.done).toBe(false)

    const result = await updates.next()
    expect(result.done).toBe(true)        
  })

  it('can execute a diagram with item flowing between two nodes', async () => {
    const create: Node = { 
      id: 'create-id',
      type: 'Create',
      inputs: [],
      outputs: [{
        id: 'Create.1.output',
        name: 'output',
      }],
      params: {}
    }

    const log: Node = {
      id: 'log-id',
      type: 'Log',
      inputs: [{
        id: 'Log.1.input',
        name: 'input',
      }],
      outputs: [],
      params: {}
    }
    
    const link: Link = {
      id: 'link-id',
      sourcePortId: 'Create.1.output',
      targetPortId: 'Log.1.input'
    }

    const diagram = new Diagram([create, log], [link])

    // track order of execution
    const order: string[] = []

    const createComputer = {
      name: 'Create',
      async *run({ output }: RunArgs) {
        order.push('running create')
        output.push([{i: 1}])
      },
    } as Computer

    const logComputer = {
      name: 'Log',
      async *run({ input }: RunArgs) {
        // console.log ... or something
        
        order.push('running log')
        const items = input.pull()
      },
    } as Computer

    const computers = new Map<string, Computer>()
      .set(createComputer.name, createComputer)
      .set(logComputer.name, logComputer)

    const storage = {
      currentExecutionId: '1',
      init: async () => {},
      createExecution: async () => {},
      putExecutionItems: async (key: string, items: ItemValue[]) => {},
    }
    
    const executor = new Executor(diagram, computers, storage)

    const updates = executor.execute()

    const update1 = await updates.next()
    expect(update1.done).toBe(false)
    expect(order).toMatchObject(['running create'])

    const update2 = await updates.next()
    expect(update2.done).toBe(false)
    expect(order).toMatchObject(['running create', 'running log',])

    const update3 = await updates.next()
    expect(update3.done).toBe(false)
    expect(order).toMatchObject(['running create', 'running log',])

    const result = await updates.next()
    expect(result.done).toBe(true)    
  })

  it('can test diagram executions like this', async () => {
    const diagram = new DiagramBuilder()
      .add(Signal, { period: 1, count: 10 })
      .add(Ignore)
      .get()
  
    await whenRunning(diagram)
      .expectSuccess()
      .ok()
  })

  it.todo('can test failed diagram executions like this', async () => {
    const diagram = new DiagramBuilder()
      .add(CreateJson)
      .add(Throw)
      .get()
    
    await whenRunning(diagram)
      .expectFail()
      .ok()
  })
})