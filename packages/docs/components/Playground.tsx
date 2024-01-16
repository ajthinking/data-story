import { Application, coreNodeProvider, Diagram } from '@data-story/core';
import React from 'react';
import { DataStory } from '@data-story/ui';

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
      <button
        onClick={() => {
          const diagram = dataStoryRef.current.toDiagram();
          saveDiagram(LocalStorageKey, diagram);
        }}
        style={{ zIndex: 1000, top: 200 }}
        className="fixed bg-blue-300 hover:bg-blue-400 text-black py-1 px-2 text-sm rounded inline-flex items-center">
        <svg className="fill-current w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M17.707 7.293l-5-5A.999.999 0 0 0 12 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a.999.999 0 0 0-.293-.707zM12 3.414L15.586 7H12V3.414zM16 16H4V4h7v5h5v7z"/>
        </svg>
        <span>Save</span>
      </button>
    );
  }

  return (
    <div className="w-full" style={{ height: '100vh' }} data-cy="playground">
      <DataStory
        slotComponent={<SaveComponent />}
        ref={dataStoryRef}
        initDiagram={initDiagram}
        server={mode === 'node'
          ? { type: 'SOCKET', url: 'ws://localhost:3100' }
          : { type: 'JS', app }}
      />
    </div>
  );
};
