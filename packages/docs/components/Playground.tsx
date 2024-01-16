import { Application, coreNodeProvider, Diagram } from '@data-story/core';
import React from 'react';
import { DataStory, SaveIcon } from '@data-story/ui';
import { ControlButton } from 'reactflow';

const saveDiagram = (key: string, diagram: Diagram) => {

  const diagramJSON = JSON.stringify({
    type: 'save',
    name: key,
    diagram
  });

  localStorage?.setItem(key, diagramJSON);
};

const loadDiagram = (key: string) => {
  if (typeof window === 'undefined' || !localStorage?.getItem(key)) {
    return {
      type: 'load',
      name: key,
      diagram: null
    };
  }

  const json = localStorage?.getItem(key);
  const { name, diagram } = JSON.parse(json);

  return {
    type: 'load',
    name,
    diagram
  };
}

const LocalStorageKey = 'data-story-diagram';

export default ({ mode }: {mode?: 'js' | 'node'}) => {
  const app = new Application()
    .register(coreNodeProvider)
    .boot();
  const dataStoryRef = React.useRef(null);

  const { diagram } = loadDiagram(LocalStorageKey);
  const [initDiagram] = React.useState<Diagram>(diagram);

  const SaveComponent = () => {
    return (
      <ControlButton
        title="Save"
        aria-label="Save"
        onClick={() => {
          const diagram = dataStoryRef.current.toDiagram();
          saveDiagram(LocalStorageKey, diagram);
          window.alert('Diagram saved!');
        }}>
        <SaveIcon />
      </ControlButton>
    );
  }

  return (
    <div className="w-full" style={{ height: '100vh' }} data-cy="playground">
      <DataStory
        slotComponent={<SaveComponent/>}
        ref={dataStoryRef}
        initDiagram={initDiagram}
        server={mode === 'node'
          ? { type: 'SOCKET', url: 'ws://localhost:3100' }
          : { type: 'JS', app }}
      />
    </div>
  );
};
