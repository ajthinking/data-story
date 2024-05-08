import { Application, coreNodeProvider, Diagram, DiagramBuilder, nodes } from '@data-story/core';
import React from 'react';
import { DataStory, type ReportLinkItems } from '@data-story/ui';
import { ServerRequest } from '../../const';

export default ({ mode, reportLinkItems }:
{
  mode?: 'js' | 'node',
  reportLinkItems?: ReportLinkItems
}) => {
  const app = new Application()
    .register(coreNodeProvider)
    .boot();
  const { Signal, Table } = nodes;

  const diagram = new DiagramBuilder()
    .add(Signal, { period: 5, count: 30 })
    .add(Table)
    .get();

  return (
    <div className="w-full" style={{ height: '36vh' }}>
      <DataStory
        initDiagram={diagram}
        reportLinkItems={reportLinkItems}
        server={mode === 'node'
          ? { type: 'SOCKET', url: ServerRequest }
          : { type: 'JS', app }}
      />
    </div>
  );
};
