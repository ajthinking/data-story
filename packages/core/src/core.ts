import { Application } from './Application';
import { coreNodeProvider } from './coreNodeProvider';
import { nodeJsNodesProvider } from './node/nodeJsNodesProvider';

// This is the default app
const core = new Application();

core.register([
  coreNodeProvider,
  nodeJsNodesProvider,
]);

core.boot();

export { core };
