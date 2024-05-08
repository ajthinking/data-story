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

  const unfolded = new UnfoldedDiagramFactory(diagram, {
    'NestedNode': nestedNode,
  }).unfold();

  console.log(JSON.stringify(unfolded.diagram, null, 2))

  return (
    <div className="w-full h-1/2">
      <DataStory
        server={{ type: 'JS', app }}
        initDiagram={
          unfolded.diagram
        }
      />
    </div>
  );
};
