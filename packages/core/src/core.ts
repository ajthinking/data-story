import { Application } from './Application';
import { coreNodeProvider } from './coreNodeProvider';

// This is the default app
const core = new Application();

core.register([
  coreNodeProvider,
]);

core.boot();

export { core };
