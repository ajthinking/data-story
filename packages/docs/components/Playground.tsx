import { DataStory } from '@data-story/ui'
import { coreNodeProvider, Application } from '@data-story/core';
import React from 'react';

export default ({ mode}: { mode?: 'js' | 'node' }) => {
  const app = new Application()
    .register(coreNodeProvider)
    .boot();
  const dataStoryRef = React.useRef(null);


  return (
    <div className="w-full" style={{ height: '100vh' }} data-cy="playground">
      <button
        onClick={() => {
          const diagram = dataStoryRef.current.toDiagram();
          console.log('diagram', diagram)
        }}
        style={{ zIndex: 1000, top: 200 }}
        className="fixed left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg inline-block">
        get diagram
      </button>
      <DataStory
        ref={dataStoryRef}
        server={mode === 'node'
          ? { type: 'SOCKET', url: 'ws://localhost:3100' }
          : { type: 'JS', app }}
      />
    </div>
  );
};
