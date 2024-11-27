import { core, nodes, RequestObserverType } from '@data-story/core';
import React from 'react';
import { DataStory } from '@data-story/ui';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { useRequestApp } from '../hooks/useRequestApp';

const { Signal, Table } = nodes;
const diagram = core.getDiagramBuilder()
  .add(Signal, { period: 5, count: 10 })
  .add(Table)
  .get();

export default () => {
  const { app, loading } = useRequestApp();
  const client = new CustomizeJSClient({ diagram: diagram, app });

  if (loading || !client) return null;
  return (
    <div className="w-full" style={{ height: '36vh' }}>
      <DataStory
        client={client}
        observers={{
          type: RequestObserverType.itemsObserver,
          // set the linkIds that you want to observe
          linkIds: [diagram.links[0]?.id],
          onReceive: (items, inputObserver) => {
            // open the devtool console to see the data change
            console.log('Observer items', items, 'Observer inputObserver', inputObserver);
          }
        }}
        hideControls={['save']}
      />
    </div>
  );
};
