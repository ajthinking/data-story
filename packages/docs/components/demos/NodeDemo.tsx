import { DataStory, DataStoryNodeComponent } from '@data-story/ui'
import '@data-story/ui/dist/data-story.css';
import { Application, DiagramBuilder, nodes, coreNodeProvider } from '@data-story/core';

export default ({ nodeName }: { nodeName: string}) => {
  const app = new Application();

  app.register(coreNodeProvider);

  app.boot();

  const diagram = new DiagramBuilder()
    .add(nodes[nodeName])
    .get()

  return (<div>
    <div className="w-full sm:w-1/2" style={{ height: '36vh' }}>
      <DataStory
        server={{ type: 'JS', app }}
        diagram={diagram}
        hideToolbar={true}
      />
    </div>
  </div>
  );
};