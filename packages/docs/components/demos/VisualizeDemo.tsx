import { core, nodes } from '@data-story/core';
import React, { useMemo } from 'react';
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

const { Signal, Table, Map, Create, Request, ConsoleLog } = nodes;

const diagram = core.getDiagramBuilder()
  .add(Signal, {
    period: 100,
    count: 100,
    expression: '{ x: ${i} }'
  })
  .add(Map, { json: '{ y: Math.cos(${x}/4) }' })
  .add(Table)
  .get();

export default () => {
  const [points, setPoints] = React.useState([]);
  const { app, loading } = useRequestApp();

  const client = useMemo(() => new CustomizeJSClient({ diagram, app }), [diagram, app]);

  const mapNode = diagram.nodes.find(n => n.type === 'Map');
  const jsonParam = mapNode.params.find(p => p.name === 'json') as any;
  jsonParam.value = {
    ...jsonParam.value,
    Evaluation: 'JS_EXPRESSION',
  }
  jsonParam.evaluations = [{
    type: 'JS_EXPRESSION',
    label: 'JS Expression',
    selected: true,
  }]

  const tableAndConsoleLog = core.getDiagramBuilder()
    .add(Create)
    .add(Request)
    .add(ConsoleLog)
    .add(Table)
    .get();

  if (loading || !client) {
    return null;
  }

  return (
    <div className="w-full" style={{ height: '60vh' }}>
      <Line options={options} data={{
        labels: points.map(p => p.x),
        datasets: [
          // {
          //   label: 'Data',
          //   data: points.map(p => p.y),
          //   borderColor: 'rgb(255, 99, 132)',
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // },
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
          observers={{
            inputObservers: [{ nodeId: 'Table.1', portId: 'input' }],
            onDataChange: (items) => {
              setPoints([
                ...points,
                ...items,
              ].slice(-100))
            },
          }}
        />
      </div>
    </div>
  );
};
