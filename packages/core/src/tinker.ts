import { DiagramBuilder } from "./DiagramBuilder";
import { Executor } from "./Executor";
import { NullStorage } from "./NullStorage";
import { ConsoleLog, CreateAttribute, CreateJson, RunDiagram, Signal } from "./computers";
import { ComputerRegistry } from "./computerRegistry";
import { promises as fs } from 'fs'
import { get } from "./utils/get";

export {}

(async () => {
  const obj = {
    user: {
      name: {
        first: 'Anders'
      }
    }
  }

  console.log(
    get(obj, 'user.name.first')
  )
})();