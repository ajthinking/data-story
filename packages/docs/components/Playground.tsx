import { DataStory } from '@data-story/ui'
import '@data-story/ui/dist/data-story.css';
import { coreNodeProvider, Application } from '@data-story/core';

export default () => {
  const app = new Application();

  app.register([
    coreNodeProvider
  ]);

  app.boot();

  return (
    <div className="w-full" style={{ height: '100vh' }}>
      <DataStory
        server={{ type: 'JS', app }}
      />
    </div>   
  );
};