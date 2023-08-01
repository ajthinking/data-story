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

// This is a minimal app
const minimal = new Application();
minimal.register({
  register: (app: Application) => {
    const all = ComputerRegistry.all();

    const some = new Map<string, Computer>()
      .set('Signal', all.get('Signal')!)
      .set('ConsoleLog', all.get('ConsoleLog')!)

    app.addComputers(some);
  },
  boot: () => {}
});
minimal.boot();
export { minimal }

