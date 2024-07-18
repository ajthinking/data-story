import { DataStory } from '@data-story/ui'
import {
  Application,
  DiagramBuilder,
  coreNodeProvider,
  nodes,
  multiline,
  core,
} from '@data-story/core';

import useWindowDimensions from '../../hooks/useWindowDimensions';

export default () => {
  const { height, width } = useWindowDimensions();
  const isSmallScreen = width < 768;

  const app = new Application();

  app.register(coreNodeProvider);

  app.boot();

  const { Signal, Pass, Comment, Ignore } = nodes;

  const diagram = core.getBuilder()
    .add({...Signal, label: 'DataSource'}, { period: 20, count: 100000})
    .add({...Pass, label: 'Transforms'})
    .add({...Ignore, label: 'Actions'})
    .from('Pass.1.output').below('Ignore.1').add({...Pass, label: 'APIs'})
    .add({...Ignore, label: 'Storage'})
    .jiggle({x: 60, y: 25})
    .above('Signal.1').add(Comment, { content: multiline`
      ### DataStory 🔥
      Combine data sources, transforms, actions, APIs, storage and more. Create custom nodes for your business logic.
    `})
    .get()

  return (
    <div className="w-full h-1/6">
      <DataStory
        server={{ type: 'JS', app }}
        initDiagram={diagram}
        onInitialize={(options) => options.run()}
        hideToolbar={true}
      />
    </div>
  );
};
