import { UnfoldedDiagramFactory, core, nodes } from '.';
import { DiagramQuery } from './DiagramQuery';
import { str } from './Param'
const { Create, Table, Input, Map, Output, ConsoleLog, Ignore } = nodes;

describe('unfold', () => {
  it('unfolds a diagram without nested nodes without modifying the diagram', () => {
    const diagram = core.getDiagramBuilder()
      .add(Create)
      .add(Table)
      .get();

    const unfolded = new UnfoldedDiagramFactory(diagram, {}).unfold();

    expect(unfolded.diagram).toEqual(diagram);
  })

  it('unfolds a diagram with simple nested node', () => {
    const nestedNode = core.getDiagramBuilder()
      .withParams([
        str({
          name: 'stamp',
          value: 'foo'}
        )
      ])
      .add(nodes.Input, { port_name: 'input'})
      .add(nodes.Map)
      .add(nodes.Output, { port_name: 'output'})
      .get()

    const diagram = core.getDiagramBuilder()
      .add(Create)
      .addNestedNode('NestedNode', nestedNode)
      .add(Ignore)
      .get()

    const { diagram: unfoldedDiagram, unfoldedGlobalParams } = UnfoldedDiagramFactory.create(diagram, {
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
          value:  {
            Cast: 'stringCast',
            value: 'foo',
          },
        }),
      ]),
    })
  })

  it('unfolds a diagram with simple nested node with custom named ports', () => {
    const nestedNode = core.getDiagramBuilder()
      .add(nodes.Input, { port_name: 'incoming'})
      .add(nodes.Map)
      .add(nodes.Output, { port_name: 'outgoing'})
      .get()

    const diagram = core.getDiagramBuilder()
      .add(Create)
      .addNestedNode('NestedNode', nestedNode)
      .add(Ignore)
      .get()

    const { diagram: unfoldedDiagram } = UnfoldedDiagramFactory.create(diagram, {
      'NestedNode': nestedNode,
    });

    const querier = new DiagramQuery(unfoldedDiagram);

    expect(querier.arePortsConnected('Create.output', 'Input.input')).toBe(true);
    expect(querier.arePortsConnected('Input.output', 'Map.input')).toBe(true);
    expect(querier.arePortsConnected('Map.output', 'Output.input')).toBe(true);
    expect(querier.arePortsConnected('Output.output', 'Ignore.input')).toBe(true);
  })

  // it('unfolds a diagram with complex nested node', () => {
  //   const nestedNode = new DiagramBuilder()
  //     // Dead end branch
  //     .add(nodes.Input, { port_name: 'ignorables'}).add(nodes.Ignore)
  //     // Main branch
  //     .add(nodes.Input, { port_name: 'acceptable'})
  //     .add(nodes.Map)
  //     .add(nodes.Output, { port_name: 'passed'})
  //     .get()

  //   const diagram = core.getBuilder()
  //     .add(Create)
  //     .addNestedNode('NestedNode', nestedNode)
  //     .add(Ignore)
  //     .get()

  //   const { diagram: unfoldedDiagram } = UnfoldedDiagramFactory.create(diagram, {
  //     'NestedNode': nestedNode,
  //   });

  //   const querier = new DiagramQuery(unfoldedDiagram);

  //   expect(querier.arePortsConnected('Create.output', 'Input.input')).toBe(true);
  //   // expect(querier.arePortsConnected('Input.output', 'Map.input')).toBe(true);
  //   // expect(querier.arePortsConnected('Map.output', 'Output.input')).toBe(true);
  //   // expect(querier.arePortsConnected('Output.output', 'Ignore.input')).toBe(true);
  // })
})
