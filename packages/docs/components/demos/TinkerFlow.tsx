import { DataStory } from '@data-story/ui'
import {
  Application,
  DiagramBuilder,
  coreNodeProvider,
  nodes,
  multiline,
  str,
} from '@data-story/core';

import useWindowDimensions from '../../hooks/useWindowDimensions';

// This component is just a place to sketch
export default () => {
  const { Create, Table, Input, Map, Output } = nodes;

  const app = new Application();
  app.register(coreNodeProvider);

  // Make a nested node
  const nestedNode = new DiagramBuilder()
    .withParams([
      str({
        name: 'message_to_add',
        value: 'This is a default value',
      }),
    ])
    .add(nodes.Input)
    .add(nodes.Map)
    .add(nodes.Output)
    .get()

  app.addNestedNode('NestedNode', nestedNode);

  app.boot();

  const diagram = new DiagramBuilder()
    .add(Create)
    .get()

  return (
    <div className="w-full h-1/2">
      <DataStory
        server={{ type: 'JS', app }}
        initDiagram={diagram}
      />
    </div>
  );
};
