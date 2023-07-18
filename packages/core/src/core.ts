import { Container } from "./Container";
import { coreNodeProvider } from "./coreNodesProvider";

// This is the default container
const core = new Container();

core.register(coreNodeProvider);

export { core };