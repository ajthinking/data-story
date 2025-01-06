import React, { useEffect, useMemo, useState } from 'react';
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
import { useDiagram } from '../hooks/useDiagram';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { createDataStoryId, multiline, RequestObserverType, LinkItemsParam } from '@data-story/core';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ObserversDemo = () => {
  const [points, setPoints] = useState([]);
  const { app, diagram, loading } = useDiagram((builder) => builder
    .add('Signal', {
      period: 100,
      count: 1000,
      expression: '{ x: ${{i}} }',
    })
    .add('Map', {
      mapper: multiline`
        item => ({
          x: \${{x}},
          y: Math.sin(\${{x}} / 4) + Math.cos(\${{x}} / 3) * Math.exp(-\${{x}} / 100) + Math.random() * 0.5
        })
        `,
    })
    .add('Table')
    .connect()
    .place()
    .get()
  );

  const client = useMemo(() => diagram
    ? new CustomizeJSClient({ diagram, app })
    : undefined,
  [diagram, app]);

  // // Listen to item changes - render graph
  useEffect(() => {
    if (!client?.observeLinkItems) return;

    const observerId = createDataStoryId();
    const observeLinkItems = {
      linkIds: diagram?.links[1]?.id ? [diagram.links[1].id] : [],
      type: RequestObserverType.observeLinkItems,
      onReceive: (params: LinkItemsParam) => {
        const newPoints = params[0].items;
        setPoints((prevPoints) => [...prevPoints, ...newPoints].slice(-100));
      },
      observerId,
    };
    const subscription = client.observeLinkItems?.(observeLinkItems as any);

    return () => subscription?.unsubscribe();
  }, [client, diagram?.links]);

  // // Listen to link counts - console.log
  useEffect(() => {
    if (!client?.observeLinkCounts) return;

    const linksCountObserver = {
      type: RequestObserverType.observeLinkCounts,
      linkIds: diagram?.links[1]?.id ? [diagram.links[1].id] : [],
      onReceive: (count) => {
        console.log('Link counts updated', count);
      },
      observerId: createDataStoryId(),
    };
    const subscription = client?.observeLinkCounts?.(linksCountObserver as any);

    return () => subscription?.unsubscribe();
  }, [client, diagram?.links]);

  // Await booting and diagram creation
  if (loading || !client || !diagram) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full" style={{ height: '60vh' }}>
      <Line
        options={{
          responsive: true,
          animation: {
            duration: 0, // general animation time
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
        }}
        data={{
          labels: points.map((p) => p.x),
          datasets: [
            {
              label: 'Data',
              data: points.map((p) => p.y),
              borderColor: 'blue',
              backgroundColor: 'blue',
            },
          ],
        }}
      />
      <div className={'h-1/2'}>
        <DataStory
          onInitialize={async ({ run }) => {
            setPoints([]);
            run();
          }}
          hideControls={['save']}
          client={client}
        />
      </div>
    </div>
  );
};

export default ObserversDemo;
