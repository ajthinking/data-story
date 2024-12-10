import { core, createDataStoryId, nodes, RequestObserverType } from '@data-story/core';
import React, { useEffect } from 'react';
import { DataStory } from '@data-story/ui';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { useRequestApp } from '../hooks/useRequestApp';

const { Signal, Table } = nodes;
const diagram = core.getDiagramBuilder()
  .add(Signal, { period: 5, count: 10 })
  .add(Table)
  .get();
const linksCountObserver = {
  type: RequestObserverType.linkCountsObserver as const,
  linkIds: [diagram.links[0]?.id],
  onReceive: (count) => {
    console.log('Link count', count);
  },
  observerId: createDataStoryId(),
}

export default () => {
  const { app, loading } = useRequestApp();
  const client = new CustomizeJSClient({ diagram: diagram, app });

  useEffect(() => {
    if (!client) {
      return;
    }
    const observerId = createDataStoryId();
    const linkItemsObserver = {
      type: RequestObserverType.linkItemsObserver as const,
      linkIds: [diagram.links[0]?.id],
      onReceive: (items) => {
        console.log('Observer items', items);
      },
      observerId
    };
    client.linkItemsObserver?.(linkItemsObserver);
    return () => {
      client.cancelObserver?.({ observerId, type: RequestObserverType.cancelObserver });
    }
  }, [client]);

  useEffect(() => {
    if (!client?.linksCountObserver || !client?.cancelObserver) return;
    client.linksCountObserver(linksCountObserver);
    return () => {
      client.cancelObserver(linksCountObserver);
    }
  }, [client]);

  if (loading || !client) return null;
  return (
    <div className="w-full" style={{ height: '36vh' }}>
      <DataStory
        client={client}
        hideControls={['save']}
      />
    </div>
  );
};
