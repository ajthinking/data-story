import { LinkId } from './types/Link'
import { ExecutionMemory } from './ExecutionMemory'
import { ItemWithParams } from './ItemWithParams'
import { Node } from './types/Node'
import { ItemValue } from './types/ItemValue'
import { ObserverController } from './ObserverController';
import { ExecutableDiagram } from './ExecutableDiagram'
import { PortName } from './types/Port'

export class InputDevice {
  constructor(
    // The node that is using this input device
    private node: Node,
    // The node topology
    private unfoldedDiagram: ExecutableDiagram,
    // Reference to the current execution state
    private memory: ExecutionMemory,
    protected readonly observerController?: ObserverController,
  ) {}

  /**
   * Shorthand to pull items at 'input'
   */
  pull(count?: number) {
    return this.pullFrom('input', count)
  }

  /**
   * Removes and return items at edges connected to input with name
   */
  pullFrom(name: PortName, count: number = Infinity): ItemWithParams[] {
    let remaining = count
    const pulled: ItemValue[] = []
    const links = this.unfoldedDiagram.diagram.linksAtInput(this.node, name)

    for(const link of links) {
      const batch = this.memory.pullLinkItems(link.id, remaining)

      if(batch.length < 1000) {
        pulled.push(...batch)
      } else {
        for(const item of batch) pulled.push(item)
      }

      remaining -= batch.length
      if(remaining === 0) break
    }

    // Enhance ItemValue to ItemWithParams
    return pulled.map(item => new ItemWithParams(
      item,
      this.node.params,
      this.globalParamsForNode(),
    ));
  }

  pullNew(template: ItemValue = {}): ItemWithParams[] {
    const item = structuredClone(template)

    return [new ItemWithParams(
      item,
      this.node.params,
      this.globalParamsForNode(),
    )]
  }

  getPortNames(): string[] {
    return this.node.inputs.map(input => input.name)
  }

  havePort(name: string): boolean {
    return this.node.inputs.some(input => input.name === name)
  }

  haveItemsAtInput(name: string, minimum?: number): boolean {
    const port = this.node.inputs.find(input => input.name === name)!

    const links = this.unfoldedDiagram.diagram.linksAtInputPortId(port.id)

    const requiredItems = minimum || 1

    for(const link of links) {
      if(this.memory.getLinkItems(link.id)!.length >= requiredItems) return true
    }

    return false
  }

  haveAllItemsAtInput(name: string): boolean {
    const port = this.node.inputs.find(input => input.name === name)!
    const links = this.unfoldedDiagram.diagram.linksAtInputPortId(port.id)

    for(const link of links) {
      const sourcePort = link.sourcePortId
      const sourceNode = this.unfoldedDiagram.diagram.nodeWithOutputPortId(sourcePort)!
      const sourceStatus = this.memory.getNodeStatus(sourceNode.id)

      if(sourceStatus !== 'COMPLETE') return false
    }

    return true
  }

  haveAllItemsAtAllInputs(): boolean {
    for(const input of this.node.inputs) {
      if(!this.haveAllItemsAtInput(input.name)) return false
    }

    return true
  }

  haveItemsAtAnyInput(): boolean {
    for(const input of this.node.inputs) {
      if(this.haveItemsAtInput(input.name)) return true
    }

    return false
  }

  setItemsAt(linkId: LinkId, items: ItemValue[]) {
    this.memory.setLinkItems(linkId, items)
  }

  protected globalParamsForNode() {
    return this.unfoldedDiagram.unfoldedGlobalParams[this.node.id]
      ?? this.unfoldedDiagram.diagram.params
  }
}
