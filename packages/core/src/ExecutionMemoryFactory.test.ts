import { ComputerFactory } from './ComputerFactory';
import { DiagramBuilder } from './DiagramBuilder'
import { ExecutionMemoryFactory } from './ExecutionMemoryFactory';
import { InMemoryStorage } from './InMemoryStorage';
import { Registry } from './Registry';
import { ConsoleLog, Create } from './computers'

describe('create', () => {
  it('sets empty link items and counts', () => {
    const diagram = new DiagramBuilder()
      .add(Create)
      .add(ConsoleLog)
      .get();

    const registry = new Registry({
      Create: new ComputerFactory().get(Create),
      ConsoleLog: new ComputerFactory().get(ConsoleLog),
    }, {})

    const storage = new InMemoryStorage();

    const memory = ExecutionMemoryFactory.create(
      diagram,
      registry,
      storage,
    );

    const [ link ] = diagram.links

    expect(memory.getLinkItems(link.id)).toEqual([]);
    expect(memory.getLinkCount(link.id)).toEqual(0);
  })

  it('sets all nodes to available', () => {
    const diagram = new DiagramBuilder()
      .add(Create)
      .add(ConsoleLog)
      .get();

    const registry = new Registry({
      Create: new ComputerFactory().get(Create),
      ConsoleLog: new ComputerFactory().get(ConsoleLog),
    }, {})

    const storage = new InMemoryStorage();

    const memory = ExecutionMemoryFactory.create(
      diagram,
      registry,
      storage,
    );

    const [ firstNode, secondNode ] = diagram.nodes;
    expect(memory.getNodeStatus(firstNode.id)).toEqual('AVAILABLE');
    expect(memory.getNodeStatus(secondNode.id)).toEqual('AVAILABLE');
  })

  it('creates input and output devices', () => {
    const diagram = new DiagramBuilder()
      .add(Create)
      .add(ConsoleLog)
      .get();

    const registry = new Registry({
      Create: new ComputerFactory().get(Create),
      ConsoleLog: new ComputerFactory().get(ConsoleLog),
    }, {})

    const storage = new InMemoryStorage();

    const memory = ExecutionMemoryFactory.create(
      diagram,
      registry,
      storage,
    );

    const [ firstNode, secondNode ] = diagram.nodes;

    expect(memory.inputDevices.get(firstNode.id)).toMatchObject({ pull: expect.any(Function)})
    expect(memory.outputDevices.get(firstNode.id)).toMatchObject({ push: expect.any(Function)})

    expect(memory.inputDevices.get(secondNode.id)).toMatchObject({ pull: expect.any(Function)})
    expect(memory.outputDevices.get(secondNode.id)).toMatchObject({ push: expect.any(Function)})
  })

  it('sets node runners', () => {
    const diagram = new DiagramBuilder()
      .add(Create)
      .add(ConsoleLog)
      .get();

    const registry = new Registry({
      Create: new ComputerFactory().get(Create),
      ConsoleLog: new ComputerFactory().get(ConsoleLog),
    }, {})

    const storage = new InMemoryStorage();

    const memory = ExecutionMemoryFactory.create(
      diagram,
      registry,
      storage,
    );

    const [ firstNode, secondNode ] = diagram.nodes;

    expect(memory.getNodeRunner(firstNode.id)).toMatchObject({ next: expect.any(Function)})
    expect(memory.getNodeRunner(secondNode.id)).toMatchObject({ next: expect.any(Function)})
  })
})
