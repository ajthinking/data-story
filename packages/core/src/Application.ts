import { Diagram } from './Diagram';
import { DiagramBuilder } from './DiagramBuilder';
import { ExecutorFactory } from './ExecutorFactory';
import { ObserverController } from './ObserverController';
import { NodeDescriptionFactory } from './NodeDescriptionFactory';
import { Registry } from './Registry';
import { Computer } from './types/Computer';
import { ServiceProvider } from './types/ServiceProvider';
import { NodeDescription } from './types/NodeDescription';

export class Application {
  hasBooted = false;

  providers: ServiceProvider[] = [];
  hooks = new Map<string, Function>();
  private registry = new Registry({}, {}, []);

  register(provider: ServiceProvider | ServiceProvider[]) {
    this.providers.push(
      ...(Array.isArray(provider) ? provider : [provider]),
    );

    return this;
  }

  async boot() {
    for(const provider of this.providers) {
      await provider.boot(this)
    }

    this.hasBooted = true;

    return this;
  }

  addComputers(computers: Computer[]) {
    for (const computer of computers) {
      this.registry.computers[computer.computerType] = computer;
    }
  }

  addConfiguredComputerAlias(
    type: string,
    aliasFactory: (original: NodeDescription) => NodeDescription,
  ) {
    this.registry.configuredComputerAliases.push({
      type,
      aliasFactory,
    })
  }

  addNestedNode(type: string, diagram: Diagram) {
    this.registry.nestedNodes[type] = diagram;
  }

  descriptions(): NodeDescription[] {
    return [
      ...this.descriptionsFromComputers(),
      ...this.descriptionsFromNestedNodes(),
      ...this.descriptionsFromConfiguredComputers(),
    ]
  }

  getDiagramBuilder() {
    return new DiagramBuilder(
      this.descriptions(),
    );
  }

  getExecutor({ diagram, observerController }: {
    diagram: Diagram;
    observerController?: ObserverController;
  }) {
    return ExecutorFactory.create({
      diagram,
      registry: this.registry,
      observerController,
    })
  }

  getRegistry() {
    return this.registry;
  }

  private descriptionsFromComputers() {
    return Object.values(this.registry.computers).map(computer => {
      return NodeDescriptionFactory.fromComputer(computer);
    });
  }

  private descriptionsFromConfiguredComputers() {
    const configurations = this.registry.configuredComputerAliases
    const originalDescriptions = [
      ...this.descriptionsFromComputers(),
      ...this.descriptionsFromNestedNodes(),
    ]

    return configurations.map(({ type, aliasFactory }) => {
      const original = originalDescriptions.find(description => description.computerType === type)
      if (!original) throw new Error(`No original description found for type ${type}`)

      return aliasFactory(original)
    })
  }

  private descriptionsFromNestedNodes() {
    return Object.entries(this.registry.nestedNodes).map(([name, diagram]) => {
      return NodeDescriptionFactory.fromDiagram(name, diagram);
    });
  }
}
