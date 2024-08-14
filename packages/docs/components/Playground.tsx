import { Application, coreNodeProvider, Diagram } from '@data-story/core';
import React from 'react';
import { DataStory, JsClientV2 } from '@data-story/ui';
import { loadDiagram, LocalStorageKey,  SaveComponent } from './Save';
import { ServerRequest } from '../const';

export default ({ mode }: {mode?: 'js' | 'node'}) => {
  const app = new Application()
    .register(coreNodeProvider)
    .boot();

  const { diagram } = loadDiagram(LocalStorageKey);
  const [initDiagram] = React.useState<Diagram>(diagram);
  const [onSave, setOnSave] = React.useState<() => void>(() => {});

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 72px)' }} data-cy="playground">
      <DataStory
        onSave={onSave}
        // TODO: avoid re-creating the client on every render
        // SyntaxError: Cannot use import statement outside a module
        // clientv2={useCreation(() => new JsClientV2(), [])}
        clientv2={new JsClientV2()}
        slotComponents={[
          <SaveComponent setSaveFunc={setOnSave}/>,
        ]}
        initDiagram={initDiagram}
        server={mode === 'node'
          ? { type: 'SOCKET', url: ServerRequest }
          : { type: 'JS', app }}
      />
    </div>
  );
};
