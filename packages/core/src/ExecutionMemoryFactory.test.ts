import { ComputerFactory } from './ComputerFactory';
import { ExecutionMemoryFactory } from './ExecutionMemoryFactory';
import { InMemoryStorage } from './InMemoryStorage';
import { Registry } from './Registry';
import { UnfoldedDiagramFactory } from './UnfoldedDiagramFactory';
import { ConsoleLog, Create } from './computers'
import { core } from './core';

describe('create', () => {
  it('sets empty link items and counts', () => {
    const diagram = core.getDiagramBuilder()
      .add(Create)
      .add(ConsoleLog)
      .get();

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const registry = new Registry({
      Create: new ComputerFactory().fromComputerConfig(Create),
      ConsoleLog: new ComputerFactory().fromComputerConfig(ConsoleLog),
    }, {})

    const storage = new InMemoryStorage();

    const factory = new ExecutionMemoryFactory(unfoldedDiagram, registry, storage);
    const memory = factory.create();

    const [ link ] = diagram.links

    expect(memory.getLinkItems(link.id)).toEqual([]);
    expect(memory.getLinkCount(link.id)).toEqual(0);
  })

  it('sets all nodes to available', () => {
    const diagram = core.getDiagramBuilder()
      .add(Create)
      .add(ConsoleLog)
      .get();

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const registry = new Registry({
      Create: new ComputerFactory().fromComputerConfig(Create),
      ConsoleLog: new ComputerFactory().fromComputerConfig(ConsoleLog),
    }, {})

    const storage = new InMemoryStorage();

    const factory = new ExecutionMemoryFactory(unfoldedDiagram, registry, storage);
    const memory = factory.create();

    const [ firstNode, secondNode ] = diagram.nodes;
    expect(memory.getNodeStatus(firstNode.id)).toEqual('AVAILABLE');
    expect(memory.getNodeStatus(secondNode.id)).toEqual('AVAILABLE');
  })

  it('creates input and output devices', () => {
    const diagram = core.getDiagramBuilder()
      .add(Create)
      .add(ConsoleLog)
      .get();

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const registry = new Registry({
      Create: new ComputerFactory().fromComputerConfig(Create),
      ConsoleLog: new ComputerFactory().fromComputerConfig(ConsoleLog),
    }, {})

    const storage = new InMemoryStorage();

    const factory = new ExecutionMemoryFactory(unfoldedDiagram, registry, storage);
    const memory = factory.create();

    const [ firstNode, secondNode ] = diagram.nodes;

    expect(memory.inputDevices.get(firstNode.id)).toMatchObject({ pull: expect.any(Function)})
    expect(memory.outputDevices.get(firstNode.id)).toMatchObject({ push: expect.any(Function)})

    expect(memory.inputDevices.get(secondNode.id)).toMatchObject({ pull: expect.any(Function)})
    expect(memory.outputDevices.get(secondNode.id)).toMatchObject({ push: expect.any(Function)})
  })

  it('sets node runners', () => {
    const diagram = core.getDiagramBuilder()
      .add(Create)
      .add(ConsoleLog)
      .get();

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const registry = new Registry({
      Create: new ComputerFactory().fromComputerConfig(Create),
      ConsoleLog: new ComputerFactory().fromComputerConfig(ConsoleLog),
    }, {})

    const storage = new InMemoryStorage();

    const factory = new ExecutionMemoryFactory(unfoldedDiagram, registry, storage);
    const memory = factory.create();

    const [ firstNode, secondNode ] = diagram.nodes;

    expect(memory.getNodeRunner(firstNode.id)).toMatchObject({ next: expect.any(Function)})
    expect(memory.getNodeRunner(secondNode.id)).toMatchObject({ next: expect.any(Function)})
  })
})
