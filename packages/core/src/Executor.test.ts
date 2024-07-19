import { Diagram } from './Diagram';
import { Computer, RunArgs } from './types/Computer';
import { ConsoleLog, Create, Ignore, Input, Output, Pass, Signal, Throw } from './computers';;
import { InMemoryStorage } from './InMemoryStorage';
import { whenRunning } from './support/diagramExecutionTester/DiagramExecutionTester';
import { Link } from './types/Link';
import { Node } from './types/Node';
import { ExecutorFactory } from './ExecutorFactory';
import { Registry } from './Registry';
import { core } from './core';

describe('execute', () => {
  it('can execute an empty diagram and return an execution update', async () => {
    const diagram = new Diagram()
    const registry = new Registry({}, {})

    const storage = new InMemoryStorage()

    const executor = ExecutorFactory.create({ diagram, registry, storage })

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
      params: []
    }

    const diagram = new Diagram({
      nodes: [node]
    })

    let proof = 'dummy-should-change-this'

    const registry = new Registry({
      Dummy: {
        async *run({}) {
          proof = 'dummy-rocks'
        },
      } as Computer
    }, {})

    const storage = new InMemoryStorage()

    const executor = ExecutorFactory.create({ diagram, registry, storage })

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
        schema: {}
      }],
      outputs: [],
      params: []
    }

    const diagram = new Diagram({
      nodes: [node]
    })

    const registry = new Registry({
      Accepter: {
        async *run({}) {
          // Do nothing
        },
      } as Computer
    }, {})

    const storage = new InMemoryStorage()

    const executor = ExecutorFactory.create({ diagram, registry, storage })

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
          schema: {}
        }
      ],
      params: []
    }

    const diagram = new Diagram({
      nodes: [node]
    })

    const registry = new Registry({
      Spawner: {
        async *run({ output }) {
          output.push([{ type: 'Zergling' }])
        },
      } as Computer
    }, {})

    const storage = new InMemoryStorage()

    const executor = ExecutorFactory.create({ diagram, registry, storage })

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
        schema: {}
      }],
      params: []
    }

    const log: Node = {
      id: 'log-id',
      type: 'Log',
      inputs: [{
        id: 'Log.1.input',
        name: 'input',
        schema: {}
      }],
      outputs: [],
      params: []
    }

    const link: Link = {
      id: 'link-id',
      sourcePortId: 'Create.1.output',
      targetPortId: 'Log.1.input'
    }

    const diagram = new Diagram({
      nodes: [create, log],
      links: [link]
    })

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

    const registry = new Registry({
      Create: createComputer,
      Log: logComputer,
    }, {})

    const storage = new InMemoryStorage()

    const executor = ExecutorFactory.create({ diagram, registry, storage })

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
    const diagram = core.getDiagramBuilder()
      .add(Signal, { period: 1, count: 10 })
      .add(Ignore)
      .get()

    await whenRunning(diagram)
      .expectSuccess()
      .ok()
  })

  it.todo('can test failed diagram executions like this', async () => {
    const diagram = core.getDiagramBuilder()
      .add(Create)
      .add(Throw)
      .get()

    console.log('OK')

    await whenRunning(diagram)
      .expectFail()
      .ok()
  })
})
