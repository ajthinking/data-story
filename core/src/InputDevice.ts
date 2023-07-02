import { LinkId } from './types/Link'
import { ExecutionMemory } from './ExecutionMemory'
import { PortName } from './types/Computer'
import { ItemWithParams } from './ItemWithParams'
import { ParamValue } from './Param'
import { Diagram } from './Diagram'
import { Node } from './types/Node'
import { InputDeviceInterface } from './types/InputDeviceInterface'
import { ItemValue } from './types/ItemValue'

export type PortLinkMap = Record<PortName, LinkId[]>

export class InputDevice implements InputDeviceInterface {
  constructor(
    // The node that is using this input device
    private node: Node,
    // The node topology
    private diagram: Diagram,
    // The current execution state
    private memory: ExecutionMemory,
    // The params passed in the node
    private params: Record<string, ParamValue>
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
  pullFrom(name: string, count: number = Infinity): ItemWithParams[] {
    let remaining = count
    const pulled: ItemValue[] = []
    const links = this.diagram.linksAtInput(this.node, name)

    for(const link of links) {
      const batch = this.memory.pullLinkItems(link.id, remaining)
      pulled.push(...batch)
      remaining -= batch.length
      if(remaining === 0) break
    }

    // Enhance ItemValue to ItemWithParams
    return pulled.map(item => new ItemWithParams(item, this.params))
  }

  haveItemsAtInput(name: string): boolean {
    const port = this.node.inputs.find(input => input.name === name)!
    const links = this.diagram.linksConnectedToPortId(port.id)

    for(const link of links) {
      if(this.memory.getLinkItems(link.id)!.length > 0) return true
    }

    return false
  }

  haveAllItemsAtInput(name: string): boolean {
    const port = this.node.inputs.find(input => input.name === name)!
    const links = this.diagram.linksConnectedToPortId(port.id)

    for(const link of links) {
      const sourcePort = link.sourcePortId
      const sourceNode = this.diagram.nodeWithOutputPortId(sourcePort)!
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

  /**
   * @visibleForTesting
   */
  setItemsAt(linkId: LinkId, items: ItemValue[]) {
    this.memory.setLinkItems(linkId, items)
  }  
}