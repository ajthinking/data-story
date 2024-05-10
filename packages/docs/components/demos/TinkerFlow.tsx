import { DataStory } from '@data-story/ui'
import {
  Application,
  DiagramBuilder,
  coreNodeProvider,
  nodes,
  multiline,
  str,
  UnfoldedDiagramFactory,
} from '@data-story/core';

import useWindowDimensions from '../../hooks/useWindowDimensions';

// This component is just a place to sketch
export default () => {
  const { Create, Table, Input, Map, Output, ConsoleLog } = nodes;

  const app = new Application();
  app.register(coreNodeProvider);

  // Make a nested node
  const nestedNode = new DiagramBuilder()
  // Dead end branch
    .add(nodes.Input, { port_name: 'ignorables'}).add(nodes.Ignore)
  // Main branch
    .add(nodes.Input, { port_name: 'acceptable'})
    .add(nodes.Map)
    .add(nodes.Output, { port_name: 'passed'})
    .get()

  app.addNestedNode('NestedNode', nestedNode);

  app.boot();

  const diagram = new DiagramBuilder()
    .add(Create)
    .addNestedNode('NestedNode', nestedNode)
    .linkByLabel('Create.output', 'NestedNode.acceptable')
    .add(ConsoleLog)
    .get()

  const nestedNodes = {
    'NestedNode': nestedNode,
  }

  const unfolded = new UnfoldedDiagramFactory(
    diagram.clone(), // TODO, unfolding should not mutate the diagram
    nestedNodes
  ).unfold();

  return (
    <div className="w-full h-1/2">
      <h3 className="text-2xl font-bold">Main Flow</h3>
      <p className="text-lg">Note the custom node *NestedNode*</p>
      <DataStory
        server={{ type: 'JS', app }}
        initDiagram={diagram}
      />
      <h3 className="text-2xl font-bold">Sub Flow</h3>
      <p className="text-lg">The green nodes here corresponds to the ports of NestedNode</p>
      <DataStory
        server={{ type: 'JS', app }}
        initDiagram={nestedNode}
      />
      <h3 className="text-2xl font-bold">Unfolded Main Flow</h3>
      <p className="text-lg">When executing the diagram, it will first be unfolded like this. Since this is a backend/headless operation we wont bother with layout.</p>
      <DataStory
        server={{ type: 'JS', app }}
        initDiagram={
          unfolded.diagram
        }
      />
    </div>
  );
};
