import '@data-story/ui/dist/data-story.css';
import { ComputerFactory, ConsoleLog, Application, DiagramBuilder, Signal } from "@data-story/core";
import { Computer } from "@data-story/core/dist/types/Computer";

export const provider = {
  register(app: Application) {
    app.addComputers(
      new Map<string, Computer>()
        .set('Signal', ComputerFactory.fromComputerConfig(Signal()))
        .set('ConsoleLog', ComputerFactory.fromComputerConfig(ConsoleLog()))
    )
  },
  boot(app: Application) {},
}