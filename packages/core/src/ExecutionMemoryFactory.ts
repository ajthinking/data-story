import { Diagram } from './Diagram'
import { ExecutionMemory } from './ExecutionMemory'
import { NodeStatus } from './Executor'
import { InputDevice } from './InputDevice'
import { InputObserverController, InputObserverController1 } from './InputObserverController'
import { ParamEvaluator } from './ItemWithParams/ParamEvaluator'
import { OutputDevice, PortLinkMap } from './OutputDevice'
import { Param } from './Param'
import { Registry } from './Registry'
import { UnfoldedDiagram } from './UnfoldedDiagram'
import { Hook } from './types/Hook'
import { ItemValue } from './types/ItemValue'
import { LinkId } from './types/Link'
import { Node, NodeId } from './types/Node'
import { Storage } from './types/Storage'

export class ExecutionMemoryFactory {
  constructor(
    public unfoldedDiagram: UnfoldedDiagram,
    public registry: Registry,
    public storage: Storage,
    public inputObserverController?: InputObserverController,
    public inputObserverControllerMock?: InputObserverController1,
  ) {}

  create() {
    // Create a new memory
    const memory = new ExecutionMemory({
      nodeStatuses: new Map<NodeId, NodeStatus>(),
      nodeRunners: new Map<NodeId, AsyncGenerator<undefined, void, void>>(),
      linkItems: new Map<LinkId, ItemValue[]>(),
      linkCounts: new Map<LinkId, number>(),
      inputDevices: new Map<NodeId, InputDevice>(),
      outputDevices: new Map<NodeId, OutputDevice>(),
      inputObserverController: this.inputObserverController,
      inputObserverControllerMock: this.inputObserverControllerMock
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

      memory.setNodeRunner(
        node.id,
        computer.run({
          input: inputDevice,
          output: outputDevice,
          params: this.makeParamsDevice(node, memory),
          storage: this.storage,
          hooks: {
            register: (hook: Hook) => {
              memory.pushHooks([hook])
            }
          },
          node,
        }),
      )
    }

    return memory
  }

  protected makeInputDevice(node: Node, memory: ExecutionMemory) {
    return new InputDevice(
      node,
      this.unfoldedDiagram,
      memory,
      this.inputObserverController,
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
      }
    })
  }
}
