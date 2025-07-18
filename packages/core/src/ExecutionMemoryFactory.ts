import { ExecutionMemory } from './ExecutionMemory'
import { NodeStatus } from './Executor'
import { InputDevice } from './InputDevice'
import { ObserverController } from './ObserverController'
import { ParamEvaluator } from './ItemWithParams/ParamEvaluator'
import { NodeRunnerContext } from './NodeRunnerContext'
import { OutputDevice, PortLinkMap } from './OutputDevice'
import { Registry } from './Registry'
import { ExecutableDiagram } from './ExecutableDiagram'
import { Computer } from './types/Computer'
import { Hook } from './types/Hook'
import { ItemValue } from './types/ItemValue'
import { LinkId } from './types/Link'
import { Node, NodeId } from './types/Node'

export class ExecutionMemoryFactory {
  constructor(
    public unfoldedDiagram: ExecutableDiagram,
    public registry: Registry,
    public observerController?: ObserverController,
  ) {}

  create() {
    // Create a new memory
    const memory = new ExecutionMemory({
      nodeStatuses: new Map<NodeId, NodeStatus>(),
      nodeRunnerContexts: new Map<NodeId, NodeRunnerContext>(),
      linkItems: new Map<LinkId, ItemValue[]>(),
      linkCounts: new Map<LinkId, number>(),
      inputDevices: new Map<NodeId, InputDevice>(),
      outputDevices: new Map<NodeId, OutputDevice>(),
      observerController: this.observerController,
    })

    // Configure the memory's initial state
    for(const link of this.unfoldedDiagram.diagram.links) {
      // Set all links to be empty
      memory.setLinkItems(link.id, [])
      memory.setLinkCount(link.id, 0)
    }

    for(const node of this.unfoldedDiagram.diagram.nodes) {
      // Set all nodes to available
      memory.setNodeStatus(node.id, 'AVAILABLE')

      // Register input devices
      // Potentially, if configured, reuse already present input device
      // (e.g. if the node is a sub diagram)
      const inputDevice = memory.inputDevices.get(node.id)
        || this.makeInputDevice(node, memory)

      // Register output devices
      // Potentially, if configured, reuse already present output device
      // (e.g. if the node is a sub diagram)
      const outputDevice = memory.outputDevices.get(node.id)
        || this.makeOutputDevice(node, memory)

      memory.inputDevices.set(node.id, inputDevice)
      memory.outputDevices.set(node.id, outputDevice)

      // Initialize runner generators
      const computer = this.registry.computers[node.type]
      if (!computer) throw new Error(`Computer "${node.type}" not found`)

      // Initialize runner context
      const context = new NodeRunnerContext(node.id);
      context.status = computer.run({
        input: inputDevice,
        output: outputDevice,
        params: this.makeParamsDevice(node, memory),
        hooks: {
          register: (hook: Hook) => {
            memory.pushHooks([hook])
          },
        },
        node,
        onComplete: context.registerOnComplete,
      })
      memory.setNodeRunnerContext(node.id, context);
    }

    return memory
  }

  protected makeInputDevice(node: Node, memory: ExecutionMemory) {
    return new InputDevice(
      node,
      this.unfoldedDiagram,
      memory,
    )
  }

  protected makeOutputDevice(node: Node, memory: ExecutionMemory) {
    let map: PortLinkMap = {}

    for(const output of node.outputs) {
      const connectedLinks = this.unfoldedDiagram.diagram.linksAtOutputPortId(output.id)
      map[output.name] = connectedLinks.map(link => link.id);
    }

    return new OutputDevice(map, memory, node)
  }

  protected makeParamsDevice(node: Node, memory: ExecutionMemory) {
    return new Proxy({}, {
      get: (_, key: string) => {
        const param = node.params.find(p => p.name === key);
        if (!param) throw new Error(`Param "${key}" does not exist`);

        try {
          const emptyItem = {}
          const evaluator = new ParamEvaluator();
          const globalParams = this.unfoldedDiagram.unfoldedGlobalParams[node.id]
            ?? this.unfoldedDiagram.diagram.params;

          return evaluator.evaluate(emptyItem, param, globalParams);
        } catch(error) {
          console.log('Failed while evaluating param', param, error)
          console.error('error', error);
          throw error
        }
      },
    })
  }
}
