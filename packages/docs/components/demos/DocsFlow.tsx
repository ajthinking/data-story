import { DataStory } from '@data-story/ui'
import '@data-story/ui/dist/data-story.css';
import {
  Application,
  DiagramBuilder,
  coreNodeProvider,
  nodes,
  multiline,
} from '@data-story/core';
import { Comment, Map } from '@data-story/core/dist/computers';
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default () => {
  const { height, width } = useWindowDimensions();
  const isSmallScreen = width < 768;

  console.log('width', width);
  console.log('height', height);

  const app = new Application();

  app.register(coreNodeProvider);

  app.boot();

  const { Signal, Pass, ConsoleLog, Ignore } = nodes;

  const diagram = new DiagramBuilder()
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
        diagram={diagram}
        callback={(options: any) => setTimeout(options.run, 100)}
        hideToolbar={true}
        hideTabs={true}
      />
    </div>   
  );
};