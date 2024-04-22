import { DataStory } from '@data-story/ui';
import { createRoot } from 'react-dom/client';
import React, { useEffect } from 'react';
import { SaveComponent } from './save';
// eslint-disable-next-line import/no-unresolved
import '@data-story/ui/data-story.css';

const container = document.getElementById('root');
const root = createRoot(container);
const ServerRequest = `ws://localhost:${window.electron.port}`;

export const App = ({ mode }: {mode?: 'js' | 'node'}) => {
  useEffect(() => {
    window.electron.onPoke((event: any, data: any) => {
      console.log('In React component...', data);
    });
  }, []);

  return (
    <div style={{
      height: '95vh',
      margin: '0px',
    }} data-cy="playground">
      <DataStory
        slotComponent={<SaveComponent  />}
        server={{
          type: 'SOCKET',
          url: ServerRequest,
        }}
      />
    </div>
  );
};

root.render(<App />);
