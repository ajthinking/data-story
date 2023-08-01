import { DataStory } from '@data-story/ui'
import '@data-story/ui/dist/data-story.css';
import { ComputerFactory, ConsoleLog, Application, DiagramBuilder, Signal } from "@data-story/core";
import { Computer } from "@data-story/core/dist/types/Computer";

export default () => {
  const app = new Application();

  app.register({
    register(app: Application) {
      app.addComputers(
        new Map<string, Computer>()
          .set('Signal', ComputerFactory.fromComputerConfig(Signal()))
          .set('ConsoleLog', ComputerFactory.fromComputerConfig(ConsoleLog()))
      )
    },
    boot(app: Application) {},
  });

  app.boot();

  const diagram = new DiagramBuilder()
    .add(Signal)
    .add(ConsoleLog)
    .get()

  return (
    <div className="w-full sm:w-1/2" style={{ height: '36vh' }}>
      <DataStory
        server={{ type: 'JS', app }}
        diagram={diagram}
        callback={(options: any) => setTimeout(options.run, 100)}
      />
    </div>   
  );
};