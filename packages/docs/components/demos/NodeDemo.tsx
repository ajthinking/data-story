import { DataStory } from '@data-story/ui'
import { core, nodes } from '@data-story/core';
import { MockJSClient } from '../splash/MockJSClient';

export default ({ nodeName }: {nodeName: string}) => {
  const diagram = core.getDiagramBuilder()
    .add(nodes[nodeName])
    .get()

  const client = new MockJSClient(diagram);
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
