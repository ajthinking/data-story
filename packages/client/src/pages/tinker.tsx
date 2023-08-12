"use client";

import { ConsoleLog, Application, DiagramBuilder, Merge, Signal, Updates, Sample } from "@data-story/core";
import { DataStory } from "@data-story/ui";
import '@data-story/ui/dist/data-story.css';

export default function Home() {
  const app = new Application();

  app.register({
    register(app: Application) {
      app.addComputers([
        Signal,
        Merge,
        Updates,
        Sample,
        ConsoleLog,
      ])
    },
    boot(app: Application) {},
  });

  app.boot();

  // const diagram = new DiagramBuilder()
  //   .add(Signal, {
  //     count: 300
  //   })
  //   .add(Merge, {
  //     requestor_merge_property: 'id',
  //     supplier_merge_property: 'id',
  //   })
  //   .from('Signal.output').add(Sample)
  //   .get()

  return <div className="h-screen">
    <div style={{ height: 400 }}>
      <DataStory
        server={{ type: 'JS', app }}
        // diagram={diagram}
      />
    </div>
    <div className="bg-blue-500 text-blue-500">Diagram 2</div>
    <div style={{ height: 400 }}>
      <DataStory
        server={{ type: 'JS', app }}
        // diagram={diagram}
      />
    </div>    
  </div>
}