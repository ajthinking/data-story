import { DataStory } from '@data-story/ui'
import '@data-story/ui/dist/data-story.css';
import { ComputerFactory, ConsoleLog, Application, DiagramBuilder, Signal } from "@data-story/core";
import { Computer } from "@data-story/core/dist/types/Computer";

export default () => {
  const app = new Application();

  app.register({
    register(app: Application) {
      app.addComputers([
        Signal,
        ConsoleLog
      ])
    },
    boot(app: Application) {},
  });

  app.boot();

  return (
    <div className="w-full" style={{ height: '100vh' }}>
      <DataStory
        server={{ type: 'JS', app }}
      />
    </div>   
  );
};