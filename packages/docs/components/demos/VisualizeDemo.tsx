import { core, createDataStoryId, ObserveLinkItems, nodes, RequestObserverType } from '@data-story/core';
import React, { useEffect, useMemo } from 'react';
import { DataStory } from '@data-story/ui';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { useRequestApp } from '../hooks/useRequestApp';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  animation: {
    duration: 0 // general animation time
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const { Signal, Table, Map } = nodes;

const diagram = core.getDiagramBuilder()
  .add(Signal, {
    period: 100,
    count: 100,
    expression: '{ x: ${i} }'
  })
  .add(Map, { mapper: 'item => ({ x: ${x}, y: Math.cos(${x}/4) })' })
  // .add(Map)
  .add(Table)
  .get();

export default () => {
  const [points, setPoints] = React.useState([]);
  const { app, loading } = useRequestApp();
  const client = useMemo(() => new CustomizeJSClient({ diagram, app }), [diagram, app]);

  const mapNode = diagram.nodes.find(n => n.type === 'Map');
  const mapperParam = mapNode.params.find(p => p.name === 'mapper') as any;
  mapperParam.value = {
    ...mapperParam.value,
    Evaluation: 'JS_FUNCTION',
  }
  mapperParam.evaluations = [{
    type: 'JS_FUNCTION',
    label: 'JS_FUNCTION',
    selected: true,
  }]

  useEffect(() => {
    if (!client) { return; }
    console.log(client, 'client');

    const observerId = createDataStoryId();
    const observeLinkItems: ObserveLinkItems = {
      linkIds: [diagram.links[1].id],
      type: RequestObserverType.observeLinkItems,
      onReceive: (items) => {
        setPoints([
          ...points,
          ...items,
        ].slice(-100));
      },
      observerId
    };
    client.observeLinkItems?.(observeLinkItems as ObserveLinkItems)

    return () => {
      client.cancelObservation?.({ observerId, type: RequestObserverType.cancelObservation });
    }
  }, [client, points]);

  useEffect(() => {
    if(!client?.observeLinkCounts || !client?.cancelObservation) return;

    const linksCountObserver = {
      type: RequestObserverType.observelinkCounts as const,
      linkIds: [diagram.links[1].id],
      onReceive: (count) => {
        console.log('Link count', count);
      },
      observerId: createDataStoryId(),
    }
    client?.observeLinkCounts?.(linksCountObserver);
    return () => { client?.cancelObservation?.({ observerId: linksCountObserver.observerId, type: RequestObserverType.cancelObservation }) };
  }, [client]);

  if (loading || !client) {
    return null;
  }

  return (
    <div className="w-full" style={{ height: '60vh' }}>
      <Line options={options} data={{
        labels: points.map(p => p.x),
        datasets: [
          {
            label: 'Data',
            data: points.map(p => p.y),
            borderColor: 'blue',
            backgroundColor: 'blue',
          },
        ],
      }}/>
      <div className={'h-1/2'}>
        <DataStory
          onInitialize={async({ run }) => {
            setPoints([])
            run()
          }}
          hideControls={['save']}
          client={client}
          itemsObserver={{
            linkIds: [diagram.links[1].id],
            type: RequestObserverType.observeLinkItems,
            onReceive: (items) => {
              setPoints([
                ...points,
                ...items,
              ].slice(-100));
            },
            observerId
          }}
          linksCountObserver={linksCountObserver}
        />
      </div>
    </div>
  );
};
