import { Application } from "./Application";
import { ComputerRegistry } from "./computerRegistry";
import { coreNodeProvider } from "./coreNodesProvider";
import { Computer } from "./types/Computer";

// This is the default app
const core = new Application();

core.register([
  coreNodeProvider,
]);

core.boot();

export { core };
