"use client";

import { Application, coreNodeProvider } from "@data-story/core";
import { DataStory } from "@data-story/ui";
import '@data-story/ui/dist/data-story.css';

export default function SharedState() {
  const app1 = new Application();
  const app2 = new Application();

  app1.register(coreNodeProvider);
  app2.register(coreNodeProvider);

  app1.boot();
  app2.boot();

  return <div className="">
    <p>Drag or add a node to see how these diagrams share state - that is not intended.</p>
    <p>It can also be reproduced by navigating between tabs/sections.</p>
    <p>Probable solution in <a className="text-blue-500" href="https://reactflow.dev/docs/examples/misc/provider/">reactflow docs</a></p>   
    <div className="mt-2 h-96" >
      <DataStory server={{ type: 'JS', app: app1 }}
      />
    </div>
    <div className="mt-2 h-96">
      <DataStory server={{ type: 'JS', app: app2 }}
      />
    </div>
  </div>
}