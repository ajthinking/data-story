import { Application } from "./Application";
import { coreNodeProvider } from "./coreNodesProvider";

// This is the default app
const core = new Application();

core.register([
  coreNodeProvider,
]);

core.boot();

export { core };
