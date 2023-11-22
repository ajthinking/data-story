import { DataStory } from '@data-story/ui'
import '@data-story/ui/dist/data-story.css';
import { coreNodeProvider, Application, DiagramBuilder } from '@data-story/core';
import { ConsoleLog, Map, Signal } from '@data-story/core/dist/computers';

export default () => {
  const app = new Application();

  app.register([
    coreNodeProvider
  ]);

  app.boot();

  const diagram = new DiagramBuilder()
    .add(Signal, { period: 1000, count: 1 })
    .add(Map, {
      properties: [{ key: 'greeting', value: '' }]
    })
    .add(ConsoleLog)
    .get()

  return (
    <div className="w-full" style={{ height: '100vh' }}>
      <DataStory
        // server={{ type: 'SOCKET', url: 'ws://localhost:3100' }}
        server={{ type: 'JS', app }}
        diagram={diagram}
      />
    </div>   
  );
};