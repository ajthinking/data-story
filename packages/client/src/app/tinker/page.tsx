"use client";

import { ConsoleLog, Application, DiagramBuilder, Merge, Signal, Updates, Sample } from "@data-story/core";
import { DataStory } from "@data-story/ui";
import '@data-story/ui/dist/data-story.css';

export default function Home() {
  const app = new Application();

  app.register({
    register(app) {
      app.addComputers([
        Signal,
        Merge,
        Updates,
        Sample,
        ConsoleLog,
      ])
    },
    boot(app) {},
  });

  app.boot();

  const diagram = new DiagramBuilder()
    .add(Signal, {
      count: 300
    })
    .add(Merge, {
      requestor_merge_property: 'id',
      supplier_merge_property: 'id',
    })
    .from('Signal.output').add(Sample)


    // .add(Sample)
    // .add(ConsoleLog)
    // .on('Merge.not_merged').add(ConsoleLog)
    .get()

  return <main className="h-screen">
    <DataStory
      server={{ type: 'JS', app }}
      diagram={diagram}
      callback={(options: any) => setTimeout(options.run, 100)}
    />
  </main>;
}