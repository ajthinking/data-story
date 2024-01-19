import { DataStory } from '@data-story/ui';
import { Application, coreNodeProvider } from '@data-story/core';
import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-unresolved
import '@data-story/ui/data-story.css'; 

const container = document.getElementById('root');
const root = createRoot(container);

const app = new Application();

app.register([
  coreNodeProvider
]);

app.boot();

root.render(<div style={{
  // height: '400px',
  height: '95vh',
  // width: '400px',
  margin: '0px',
}}>
  <DataStory 
    server={{
      type: 'SOCKET',
      url: 'http://localhost:3100',
    }}
  />
</div>);