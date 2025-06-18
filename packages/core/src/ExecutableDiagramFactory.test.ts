import { ExecutableDiagramFactory, core, nodes } from '.';
import { DiagramQuery } from './DiagramQuery';
import { str } from './Param'
const { Create, Table, Input, Map, Output, ConsoleLog, Ignore } = nodes;

describe('unfold', () => {
  it('unfolds a diagram without nested nodes without modifying the diagram', async () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Create')
      .add('Table')
      .connect()
      .get();

    const unfolded = new ExecutableDiagramFactory(diagram, {}).unfold();

    expect(unfolded.diagram).toEqual(diagram);
  })

  it('unfolds a diagram with simple nested node', async () => {
    const app = await core.boot()
    const nestedNode = app.getDiagramBuilder()
      .withParams([
        str({
          name: 'stamp',
          value: 'foo',
        }),
      ])
      .add('Input', { port_name: 'input' })
      .add('Map')
      .add('Output', { port_name: 'output' })
      .connect()
      .get()

    const diagram = core.getDiagramBuilder()
      .add('Create')
      .addNestedNode('NestedNode', nestedNode)
      .add('Ignore')
      .connect()
      .get()

    const { diagram: unfoldedDiagram, unfoldedGlobalParams } = ExecutableDiagramFactory.create(diagram, {
      'NestedNode': nestedNode,
    });

    const querier = new DiagramQuery(unfoldedDiagram);

    expect(querier.arePortsConnected('Create.output', 'Input.input')).toBe(true);
    expect(querier.arePortsConnected('Input.output', 'Map.input')).toBe(true);
    expect(querier.arePortsConnected('Map.output', 'Output.input')).toBe(true);
    expect(querier.arePortsConnected('Output.output', 'Ignore.input')).toBe(true);

    // Ensure params are copied to globalParam
    expect(unfoldedGlobalParams).toMatchObject({
      'Input.1': expect.arrayContaining([
        expect.objectContaining({
          name: 'stamp',
          input:  {
            Cast: 'stringCast',
            rawValue: 'foo',
          },
        }),
      ]),
    })
  })

  it('unfolds a diagram with simple nested node with custom named ports', async () => {
    const app = await core.boot()
    const nestedNode = app.getDiagramBuilder()
      .add('Input', { port_name: 'incoming' })
      .add('Map')
      .add('Output', { port_name: 'outgoing' })
      .connect()
      .get()

    const diagram = app.getDiagramBuilder()
      .add('Create')
      .addNestedNode('NestedNode', nestedNode)
      .add('Ignore')
      .connect()
      .get()

    const { diagram: unfoldedDiagram } = ExecutableDiagramFactory.create(diagram, {
      'NestedNode': nestedNode,
    });

    const querier = new DiagramQuery(unfoldedDiagram);

    expect(querier.arePortsConnected('Create.output', 'Input.input')).toBe(true);
    expect(querier.arePortsConnected('Input.output', 'Map.input')).toBe(true);
    expect(querier.arePortsConnected('Map.output', 'Output.input')).toBe(true);
    expect(querier.arePortsConnected('Output.output', 'Ignore.input')).toBe(true);
  })
})
