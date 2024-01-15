import { DataStory } from '@data-story/ui'
import { Application, coreNodeProvider, Diagram } from '@data-story/core';
import React from 'react';

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

  // 1. 使用 saveDiagramToJSON 进行 diagram 的保存 localStorage


  // 2. 讨论后面的问题
  // 3. 说明每个字段的含义和使用：initDiagram and dataStoryRef.current.toDiagram
  // 4. 提PR

  return (
    <div className="w-full" style={{ height: '100vh' }} data-cy="playground">
      <button
        onClick={() => {
          const diagram = dataStoryRef.current.toDiagram();
          saveDiagram(LocalStorageKey, diagram);
        }}
        style={{ zIndex: 1000, top: 200 }}
        className="fixed left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg inline-block">
        save diagram
      </button>
      <DataStory
        ref={dataStoryRef}
        initDiagram={initDiagram}
        server={mode === 'node'
          ? { type: 'SOCKET', url: 'ws://localhost:3100' }
          : { type: 'JS', app }}
      />
    </div>
  );
};
