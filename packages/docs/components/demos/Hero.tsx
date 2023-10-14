import { DataStory, stuff } from '@data-story/ui'
import '@data-story/ui/dist/data-story.css';
import { ConsoleLog, Application, DiagramBuilder, Signal, Sleep, coreNodeProvider, Pass, Ignore } from "@data-story/core";

export default () => {
  console.log(stuff)

  const app = new Application();

  app.register(coreNodeProvider);

  app.boot();

  const diagram = new DiagramBuilder()
    .add(Signal)
    .add(Pass)
    .add(ConsoleLog)
    .add(Signal)
    .add(Sleep, {
      duration: 300,
    })
    .add(Ignore)
    .get()

  return (
    <div className="w-full sm:w-1/2" style={{ height: '36vh' }}>
      <DataStory
        server={{ type: 'JS', app }}
        diagram={diagram}
        callback={(options: any) => setTimeout(options.run, 100)}
        hideToolbar={true}
      />
    </div>   
  );
};