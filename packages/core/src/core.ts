import { Application } from "./Application";
import { coreNodeProvider } from "./coreNodesProvider";
import { nodeJsNodesProvider } from "./node/NodeJsNodeProvider";

// This is the default app
const core = new Application();

core.register([
  coreNodeProvider,
  nodeJsNodesProvider,
]);

core.boot();

export { core };
