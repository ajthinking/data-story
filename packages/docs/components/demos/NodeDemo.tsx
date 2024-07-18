import { DataStory } from '@data-story/ui'
import { Application, nodes, coreNodeProvider, core } from '@data-story/core';

export default ({ nodeName }: { nodeName: string}) => {
  const app = new Application();

  app.register(coreNodeProvider);

  app.boot();

  const diagram = core.getBuilder()
    .add(nodes[nodeName])
    .get()

  return (<div>
    <div className="w-full" style={{ height: '36vh' }}>
      <DataStory
        server={{ type: 'JS', app }}
        initDiagram={diagram}
        hideToolbar={true}
      />
    </div>
  </div>
  );
};
