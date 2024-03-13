import { DataStory } from '@data-story/ui'
import {
  Application,
  DiagramBuilder,
  coreNodeProvider,
  nodes,
  multiline,
} from '@data-story/core';

import useWindowDimensions from '../../hooks/useWindowDimensions';

export default () => {
  const app = new Application();

  app.register(coreNodeProvider);

  app.boot();

  const { Input, Output, Signal, Map, ConsoleLog } = nodes;

  const CoolStamper = new DiagramBuilder()
    .add(Input)
    .add(Map, { json: { is_cool: true }})
    .add(Output)
    .get()

  const diagram = new DiagramBuilder()
    .registerLocalNodeDefinitions({ CoolStamper })
    .add(Signal)
    .addSubNode('CoolStamper')
    .add(ConsoleLog)
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
