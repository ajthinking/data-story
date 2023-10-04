"use client";

import { Application, coreNodeProvider } from "@data-story/core";
import { DataStory } from "@data-story/ui";
import '@data-story/ui/dist/data-story.css';

export default function Home() {
  const app = new Application();

  app.register(coreNodeProvider);

  app.boot();

  return <div className="h-screen">
    <div className="bg-blue-500 text-white">Diagram 1</div>
    <div style={{ height: 400 }}>
      <DataStory
        server={{ type: 'JS', app }}
        // diagram={diagram}
      />
    </div>
    <div className="bg-blue-500 text-white">Diagram 2</div>
    <div style={{ height: 400 }}>
      <DataStory
        server={{ type: 'JS', app }}
        // diagram={diagram}
      />
    </div>    
  </div>
}