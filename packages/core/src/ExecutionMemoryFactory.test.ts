import { ComputerFactory } from './ComputerFactory';
import { ExecutionMemoryFactory } from './ExecutionMemoryFactory';
import { Registry } from './Registry';
import { UnfoldedDiagramFactory } from './UnfoldedDiagramFactory';
import { ConsoleLog, Create } from './computers'
import { core } from './core';

describe('create', () => {
  it('sets empty link items and counts', async () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Create')
      .add('ConsoleLog')
      .connect()
      .get();

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const registry = new Registry({
      Create: new ComputerFactory().getInstance(Create),
      ConsoleLog: new ComputerFactory().getInstance(ConsoleLog),
    }, {})

    const factory = new ExecutionMemoryFactory(unfoldedDiagram, registry);
    const memory = factory.create();

    const [ link ] = diagram.links

    expect(memory.getLinkItems(link.id)).toEqual([]);
    expect(memory.getLinkCount(link.id)).toEqual(0);
  })

  it('sets all nodes to available',async  () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Create')
      .add('ConsoleLog')
      .get();

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const registry = new Registry({
      Create: new ComputerFactory().getInstance(Create),
      ConsoleLog: new ComputerFactory().getInstance(ConsoleLog),
    }, {})

    const factory = new ExecutionMemoryFactory(unfoldedDiagram, registry);
    const memory = factory.create();

    const [ firstNode, secondNode ] = diagram.nodes;
    expect(memory.getNodeStatus(firstNode.id)).toEqual('AVAILABLE');
    expect(memory.getNodeStatus(secondNode.id)).toEqual('AVAILABLE');
  })

  it('creates input and output devices', async () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Create')
      .add('ConsoleLog')
      .connect()
      .get();

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const registry = new Registry({
      Create: new ComputerFactory().getInstance(Create),
      ConsoleLog: new ComputerFactory().getInstance(ConsoleLog),
    }, {})

    const factory = new ExecutionMemoryFactory(unfoldedDiagram, registry);
    const memory = factory.create();

    const [ firstNode, secondNode ] = diagram.nodes;

    expect(memory.inputDevices.get(firstNode.id)).toMatchObject({ pull: expect.any(Function) })
    expect(memory.outputDevices.get(firstNode.id)).toMatchObject({ push: expect.any(Function) })

    expect(memory.inputDevices.get(secondNode.id)).toMatchObject({ pull: expect.any(Function) })
    expect(memory.outputDevices.get(secondNode.id)).toMatchObject({ push: expect.any(Function) })
  })

  it('sets node runners', async () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Create')
      .add('ConsoleLog')
      .get();

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const registry = new Registry({
      Create: new ComputerFactory().getInstance(Create),
      ConsoleLog: new ComputerFactory().getInstance(ConsoleLog),
    }, {})

    const factory = new ExecutionMemoryFactory(unfoldedDiagram, registry);
    const memory = factory.create();

    const [ firstNode, secondNode ] = diagram.nodes;

    expect(memory.getNodeRunner(firstNode.id)).toMatchObject({ next: expect.any(Function) })
    expect(memory.getNodeRunner(secondNode.id)).toMatchObject({ next: expect.any(Function) })
  })
})
