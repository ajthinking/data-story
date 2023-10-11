import { DataStory } from '@data-story/ui'
import '@data-story/ui/dist/data-story.css';
import { ConsoleLog, Application, DiagramBuilder, Signal, coreNodeProvider } from "@data-story/core";

export default () => {
  const app = new Application();

  app.register(coreNodeProvider);

  app.boot();

  const diagram = new DiagramBuilder()
    .add(Signal)
    .get()

  return (
    <div className="w-full sm:w-1/2" style={{ height: '36vh' }}>
      <DataStory server={{ type: 'JS', app }} diagram={diagram}/>
    </div>   
  );
};