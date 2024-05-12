import { Application, coreNodeProvider, Diagram, DiagramBuilder, nodes } from '@data-story/core';
import React from 'react';
import { DataStory, type DataStoryObservers } from '@data-story/ui';
import { ServerRequest } from '../../const';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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

export default () => {
  const [points, setPoints] = React.useState([]);

  const app = new Application()
    .register(coreNodeProvider)
    .boot();
  const { Signal, Table, Map, Create, Request, ConsoleLog } = nodes;

  const diagram = new DiagramBuilder()
    .add(Signal, {
      period: 100,
      count: 100,
      expression: '{ x: ${i} }' })
    .add(Map, { json: '{ y: Math.cos(${x}/4) }' })
    .add(Table)
    .get();

  const mapNode = diagram.nodes.find(n => n.type === 'Map');
  const jsonParam = mapNode.params.find(p => p.name === 'json') as any;
  jsonParam.evaluations = [{
    type: 'JS_EXPRESSION',
    label: 'JS Expression',
    selected: true,
  }]

  const tableAndConsoleLog = new DiagramBuilder()
    .add(Create)
    .add(Request)
    .add(ConsoleLog)
    .add(Table)
    .get();

  return (
    <div className="w-full" style={{ height: '36vh' }}>
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
      }} />
      <DataStory
        callback={({ run }) => {
          setPoints([])
          run()
        }}
        initDiagram={diagram}
        observers={{
          inputObservers: [{ nodeId: 'Table.1', portId: 'input'}],
          onDataChange: (items) => {
            setPoints([
              ...points,
              ...items,
            ].slice(-100))
          },
        }}
        server={{ type: 'JS', app }}
      />
    </div>
  );
};
