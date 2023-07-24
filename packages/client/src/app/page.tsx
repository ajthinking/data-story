"use client";

import { ComputerFactory, ConsoleLog, Container, DiagramBuilder, Signal } from "@data-story/core";
import { Computer } from "@data-story/core/dist/types/Computer";
import { DataStory } from "@data-story/ui";
import '@data-story/ui/dist/data-story.css';

export default function Home() {
  const app = new Container();

  app.register({
    register(container: Container) {
      container.addComputers(
        new Map<string, Computer>()
          .set('Signal', ComputerFactory.fromComputerConfig(Signal()))
          .set('ConsoleLog', ComputerFactory.fromComputerConfig(ConsoleLog()))
      )
    },
    boot(container: Container) {},
  });

  app.boot();

  const diagram = new DiagramBuilder()
    .add(Signal)
    .add(ConsoleLog)
    .get()

  return <main className="flex h-screen">
    <DataStory
      server={{ type: 'JS', app }}
      diagram={diagram}
    />
  </main>;
}


/*
// SAMPLE DIAGRAM

{
  "nodes": [
    {
      "width": 128,
      "height": 52,
      "id": "Signal.1",
      "position": {
        "x": 85.28728182478848,
        "y": 161.10045919610965
      },
      "data": {
        "params": {
          "name": {
            "id": "name",
            "name": "name",
            "type": "string",
            "value": "",
            "rows": 1
          },
          "label": {
            "id": "label",
            "name": "label",
            "type": "string",
            "value": "",
            "rows": 1
          },
          "period": {
            "id": "period",
            "name": "period",
            "type": "number",
            "value": 50,
            "rows": 1
          },
          "count": {
            "id": "count",
            "name": "count",
            "type": "number",
            "value": 300,
            "rows": 1
          }
        },
        "computer": "Signal",
        "label": "Signal",
        "inputs": [],
        "outputs": [
          {
            "id": "Signal.1.output",
            "name": "output",
            "schema": {
              "id": "any"
            }
          }
        ]
      },
      "type": "dataStoryNodeComponent",
      "positionAbsolute": {
        "x": 85.28728182478848,
        "y": 161.10045919610965
      }
    },
    {
      "width": 128,
      "height": 78,
      "id": "Sleep.1",
      "position": {
        "x": 457.46498459114946,
        "y": 203.37035327281424
      },
      "data": {
        "params": {
          "name": {
            "id": "name",
            "name": "name",
            "type": "string",
            "value": "",
            "rows": 1
          },
          "label": {
            "id": "label",
            "name": "label",
            "type": "string",
            "value": "",
            "rows": 1
          },
          "duration": {
            "id": "duration",
            "name": "duration",
            "type": "number",
            "value": 100,
            "rows": 1
          }
        },
        "computer": "Sleep",
        "label": "Sleep",
        "inputs": [
          {
            "id": "Sleep.1.input",
            "name": "input",
            "schema": {}
          }
        ],
        "outputs": [
          {
            "id": "Sleep.1.output",
            "name": "output",
            "schema": {}
          }
        ]
      },
      "type": "dataStoryNodeComponent",
      "selected": false,
      "positionAbsolute": {
        "x": 457.46498459114946,
        "y": 203.37035327281424
      },
      "dragging": false
    },
    {
      "width": 128,
      "height": 52,
      "id": "ConsoleLog.1",
      "position": {
        "x": 680.8913452383551,
        "y": 220.02954479553762
      },
      "data": {
        "params": {
          "name": {
            "id": "name",
            "name": "name",
            "type": "string",
            "value": "",
            "rows": 1
          },
          "label": {
            "id": "label",
            "name": "label",
            "type": "string",
            "value": "",
            "rows": 1
          },
          "message": {
            "id": "message",
            "name": "message",
            "type": "string",
            "rows": 1
          }
        },
        "computer": "ConsoleLog",
        "label": "ConsoleLog",
        "inputs": [
          {
            "id": "ConsoleLog.1.input",
            "name": "input",
            "schema": {}
          }
        ],
        "outputs": []
      },
      "type": "dataStoryNodeComponent",
      "selected": true,
      "positionAbsolute": {
        "x": 680.8913452383551,
        "y": 220.02954479553762
      },
      "dragging": false
    }
  ],
  "edges": [
    {
      "sourceHandle": "Signal.1.output",
      "targetHandle": "Sleep.1.input",
      "source": "Signal.1",
      "target": "Sleep.1",
      "id": "Signal.1.output--->Sleep.1.input"
    },
    {
      "sourceHandle": "Sleep.1.output",
      "targetHandle": "ConsoleLog.1.input",
      "source": "Sleep.1",
      "target": "ConsoleLog.1",
      "id": "Sleep.1.output--->ConsoleLog.1.input"
    }
  ],
  "viewport": {
    "x": 0,
    "y": 0,
    "zoom": 1
  }
}

*/