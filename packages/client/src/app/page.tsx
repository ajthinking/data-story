"use client";

import { ComputerFactory, ConsoleLog, Application, DiagramBuilder, Merge, Signal, Updates } from "@data-story/core";
import { Computer } from "@data-story/core/dist/types/Computer";
import { DataStory } from "@data-story/ui";
import '@data-story/ui/dist/data-story.css';
// TODO: enable separate import of nodejs stuff:
// import { someFsStuff } from "@data-story/core/node";
// TODO: enable separate import of browser stuff:
// import { someBrowserStuff } from "@data-story/core/browser";
// See core/package.json exports

import { useState } from "react";

export default function Home() {
  // const [id, setId] = useState(0);
  // const app = new Application();

  // app.register({
  //   register(app: Application) {
  //     // Add some computers
  //     app.addComputers(
  //       new Map<string, Computer>()
  //         .set('Signal', ComputerFactory.fromComputerConfig(Signal()))
  //         .set('ConsoleLog', ComputerFactory.fromComputerConfig(ConsoleLog()))
  //         .set('Updates', ComputerFactory.fromComputerConfig(Updates()))
  //         .set('Merge', ComputerFactory.fromComputerConfig(Merge()))
  //     )
  //   },
  //   boot(app: Application) {},
  // });

  // app.boot();

  // const diagram = new DiagramBuilder()
  //   .add(Signal, { count: 50 })
  //   .add(Merge)
  //   .add(ConsoleLog)
  //   .on('Merge.not_merged').add(ConsoleLog)
  //   .get()

  return <main className="h-screen">
    {/* By default it will use the websocket server */}
    <DataStory
      // server={{ type: 'JS', app }}
      // diagram={diagram}
      // callback={(options: any) => setTimeout(options.run, 100)}
    />
  </main>;
}