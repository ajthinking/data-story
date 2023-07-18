import { Container } from "./Container";
import { ComputerRegistry } from "./computerRegistry";
import { coreNodeProvider } from "./coreNodesProvider";
import { Computer } from "./types/Computer";

// This is the default container
const core = new Container();

core.register([
  coreNodeProvider,
]);

core.boot();

export { core };

// This is a minimal container
const minimal = new Container();
minimal.register({
  register: (container: Container) => {
    const all = ComputerRegistry.all();

    const some = new Map<string, Computer>()
      .set('Signal', all.get('Signal')!)
      .set('ConsoleLog', all.get('ConsoleLog')!)

    container.addComputers(some);
  },
  boot: () => {}
});
minimal.boot();
export { minimal }

