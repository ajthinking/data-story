import { core, createDataStoryId, nodes, RequestObserverType } from '@data-story/core';
import React, { useEffect } from 'react';
import { DataStory } from '@data-story/ui';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { useRequestApp } from '../hooks/useRequestApp';

const { Signal, Table, ConsoleLog } = nodes;
const diagram = core.getDiagramBuilder()
  .add(Signal, { period: 5, count: 10 })
  .add(Table)
  .from('Signal.1.output').below('Table.1').add(Table)
  .get();

const linksCountObserver = {
  type: RequestObserverType.observeLinkCounts as const,
  linkIds: [diagram.links[0]?.id, diagram.links[1]?.id],
  onReceive: (count) => {
    console.log('Link count', count);
  },
  observerId: createDataStoryId(),
}

export default () => {
  const { app, loading } = useRequestApp();
  const client = new CustomizeJSClient({ diagram, app });

  useEffect(() => {
    if (!client) {
      return;
    }
    const observerId = createDataStoryId();
    const observeLinkItems = {
      type: RequestObserverType.observeLinkItems as const,
      linkIds: [diagram.links[0]?.id, diagram.links[1]?.id],
      onReceive: (items) => {
        console.log('Observer items', items);
      },
      observerId
    };
    const subscription = client.observeLinkItems?.(observeLinkItems);
    return () => {
      subscription?.unsubscribe();
    }
  }, [client]);

  useEffect(() => {
    if (!client?.observeLinkCounts || !client?.cancelObservation) return;
    const subscription = client.observeLinkCounts(linksCountObserver);
    return () => {
      subscription?.unsubscribe();
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
