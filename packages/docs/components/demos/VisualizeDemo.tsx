import { core, createDataStoryId, ObserveLinkItems, nodes, RequestObserverType, ItemValue, ObserveLinkCounts } from '@data-story/core';
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

const diagram = core.getDiagramBuilder()
  .add('Signal', {
    period: 100,
    count: 100,
    expression: '{ x: ${i} }'
  })
  .add('Map', { mapper: 'item => ({ x: ${x}, y: Math.cos(${x}/4) })' })
  // .add(Map)
  .add('Table')
  .get();

export default () => {
  const [points, setPoints] = React.useState<ItemValue[]>([]);
  const { app, loading } = useRequestApp();
  const client = useMemo(() => new CustomizeJSClient({ diagram, app }), [diagram, app]);

  const mapNode = diagram.nodes.find(n => n.name === 'Map');
  const mapperParam = mapNode!.params.find(p => p.name === 'mapper') as any;
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

    const observerId = createDataStoryId();
    const observeLinkItems: ObserveLinkItems = {
      linkIds: [diagram.links[1].id],
      type: RequestObserverType.observeLinkItems,
      onReceive: (items) => {
        const latestPoints = items[0].items;
        setPoints([
          ...points,
          ...latestPoints,
        ].slice(-100));
      },
      observerId
    };
    const subscription = client.observeLinkItems?.(observeLinkItems as ObserveLinkItems)

    return () => subscription?.unsubscribe()
  }, [client, points]);

  useEffect(() => {
    if(!client?.observeLinkCounts) return;

    const linksCountObserver = {
      type: RequestObserverType.observeLinkCounts as const,
      linkIds: [diagram.links[1].id],
      onReceive: (count: number) => {
        console.log('Link count', count);
      },
      observerId: createDataStoryId(),
    }
    const subscription = client?.observeLinkCounts?.(linksCountObserver as unknown as ObserveLinkCounts);
    return () =>  subscription?.unsubscribe()
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
        />
      </div>
    </div>
  );
};
