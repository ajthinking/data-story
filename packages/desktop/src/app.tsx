import { DataStory } from '@data-story/ui';
import { Application, coreNodeProvider, Diagram } from '@data-story/core';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { SaveComponent } from './save';
// eslint-disable-next-line import/no-unresolved
import '@data-story/ui/data-story.css';

const container = document.getElementById('root');
const root = createRoot(container);

export const App = ({ mode }: {mode?: 'js' | 'node'}) => {
  const app = new Application()
    .register(coreNodeProvider)
    .boot();

  const [initDiagram, setInitDiagram] = React.useState<Diagram>();
  const updateDiagram = (diagram: Diagram) => {
    setInitDiagram(diagram);
  }

  return (
    <div style={{
      height: '95vh',
      margin: '0px',
    }} data-cy="playground">
      <div>
        {JSON.stringify(initDiagram)}
      </div>
      <DataStory
        slotComponent={<SaveComponent updateDiagram={ updateDiagram } />}
        initDiagram={initDiagram}
        server={{ type: 'JS', app }}
      />
    </div>
  );
};

root.render(<App />);
