import { DataStory } from '@data-story/ui'
import { core, nodes } from '@data-story/core';
import { MockJSClient } from '../splash/MockJSClient';
import { useRequestApp } from '../hooks/useRequestApp';

export default ({ nodeName }: {nodeName: string}) => {
  const diagram = core.getDiagramBuilder()
    .add(nodes[nodeName])
    .get()

  const { app, loading } = useRequestApp();
  const client = new MockJSClient({ diagram: diagram, app });

  if (loading || !client) return null;
  return (<div>
    <div className="w-full" style={{ height: '36vh' }}>
      <DataStory
        client={client}
        initDiagram={diagram}
        hideControls={true}
      />
    </div>
  </div>
  );
};
