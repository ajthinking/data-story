import { Application, coreNodeProvider, Diagram } from '@data-story/core';
import React from 'react';
import { DataStory, JsClientV2 } from '@data-story/ui';
import { loadDiagram, LocalStorageKey,  SaveComponent } from './Save';
import { ServerRequest } from '../const';
import { useCreation } from 'ahooks';

export default ({ mode }: {mode?: 'js' | 'node'}) => {
  const app = new Application()
    .register(coreNodeProvider)
    .boot();

  const { diagram } = loadDiagram(LocalStorageKey);
  const [initDiagram] = React.useState<Diagram>(diagram);

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 72px)' }} data-cy="playground">
      <DataStory
        // TODO: avoid re-creating the client on every render
        // SyntaxError: Cannot use import statement outside a module
        // clientv2={useCreation(() => new JsClientV2(), [])}
        clientv2={new JsClientV2()}
        slotComponents={[
          <SaveComponent/>,
        ]}
        initDiagram={initDiagram}
        server={mode === 'node'
          ? { type: 'SOCKET', url: ServerRequest }
          : { type: 'JS', app }}
      />
    </div>
  );
};
