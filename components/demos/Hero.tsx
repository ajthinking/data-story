import { DataStory } from '@data-story/ui'
import '@data-story/ui/dist/data-story.css';
import { ComputerFactory, ConsoleLog, Container, DiagramBuilder, SerializedReactDiagramFactory, Signal } from "@data-story/core";
import { Computer } from "@data-story/core/dist/types/Computer";

export default () => {
  const core = new Container();

  core.register({
    register(container: Container) {
      container.addComputers(
        new Map<string, Computer>()
          .set('Signal', ComputerFactory.fromComputerConfig(Signal()))
          .set('ConsoleLog', ComputerFactory.fromComputerConfig(ConsoleLog()))
      )
    },
    boot(container: Container) {},
  });

  core.boot();

  const diagram = new DiagramBuilder()
    .add(Signal)
    .add(ConsoleLog)
    .get()
  
  const reactFlow = new SerializedReactDiagramFactory(core.descriptions())
    .fromDiagram(diagram)

  return (
    <div className="w-full sm:w-1/2" style={{ height: '36vh' }}>
      <DataStory
        server={{ type: 'JS' }}
        diagram={reactFlow}        
      />
    </div>   
  );
};