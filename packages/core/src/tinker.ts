import { DiagramBuilder } from "./DiagramBuilder";
import { Executor } from "./Executor";
import { NullStorage } from "./NullStorage";
import { ConsoleLog, CreateProperty, CreateJson, RunDiagram, Signal } from "./computers";
import { ComputerRegistry } from "./computerRegistry";
import { promises as fs } from 'fs'
import { get } from "./utils/get";
import { mapAdditive } from "./computers/MapProperties/mapAdditive";

export {}

(async () => {
  const original = {
    id: "some-id",
    person: {
      firstname: "John",
      age: 42
    }
  }
  

  const map = {
    vendor_id: "id",
    // properties: {}
    properties: {
      name: "person.firstname",
      metadata: {
        age: "person.age"
      }
    }
  }

  const mapped = mapAdditive(original, map)
  // const mapped = mapAdditive({}, {})

  console.log(
    mapped
  )
})();