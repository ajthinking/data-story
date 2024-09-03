import { DataStory } from '@data-story/ui'
import { Application, nodes, coreNodeProvider, core } from '@data-story/core';
import { MockJSClient } from '../splash/MockJSClient';

export default ({ nodeName }: { nodeName: string}) => {
  const app = new Application();

  app.register(coreNodeProvider);

  app.boot();

  const diagram = core.getDiagramBuilder()
    .add(nodes[nodeName])
    .get()

  const client = new MockJSClient(diagram);
  return (<div>
    <div className="w-full" style={{ height: '36vh' }}>
      <DataStory
        server={{ type: 'JS', app }}
        client={client}
        initDiagram={diagram}
        hideControls={true}
      />
    </div>
  </div>
  );
};
