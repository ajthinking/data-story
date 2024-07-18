import { DataStory } from '@data-story/ui'
import {
  Application,
  DiagramBuilder,
  coreNodeProvider,
  nodes,
  multiline,
  str,
  UnfoldedDiagramFactory,
  core,
} from '@data-story/core';

import useWindowDimensions from '../../hooks/useWindowDimensions';

// This component is just a place to sketch
export default () => {
  const { Create, Table, Input, Map, Output, ConsoleLog } = nodes;

  const app = new Application();
  app.register(coreNodeProvider);

  app.boot();

  const diagram = core.getDiagramBuilder()
    .add(Create)
    .get()

  diagram.params = [
    str({
      name: 'message',
      help: 'A message to pass on into the execution.',
    })
  ]

  return (
    <div className="w-full h-1/2">
      <DataStory
        server={{ type: 'JS', app }}
        initDiagram={diagram}
      />
    </div>
  );
};
