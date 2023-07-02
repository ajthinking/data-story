import { LinkId } from './types/Link'
import { ItemValue } from './types/ItemValue'
import { PortId } from './types/Port'
import { PortName } from './types/Computer'
import { ExecutionMemory } from './ExecutionMemory'
import { ItemWithParams } from './ItemWithParams'

type LinkItems = Record<LinkId, ItemValue>

export type OutputTree = Record<PortId, LinkItems>

export type PortLinkMap = Record<PortName, LinkId[]>

export interface OutputDeviceInterface {
  push(items: ItemValue): void
  pushTo(name: string, items: ItemValue): void
  itemsAt?(name: string): ItemValue
}

export class OutputDevice implements OutputDeviceInterface {
  constructor(
    private portLinkMap: PortLinkMap = {},
    private memory: ExecutionMemory,
  ) {}

  push(items: ItemValue[]) {
    return this.pushTo('output', items)
  }

  pushTo(name: PortName, itemable: (ItemValue | ItemWithParams)[]) {
    console.log(`Pushing to ${name}`)
    console.log(this.portLinkMap)

    const connectedLinks = this.portLinkMap[name]

    // When outputting we should not be in a params infused ItemWithParams
    const items = itemable.map(i =>  i instanceof ItemWithParams ? i.value: i)
    
    for(const linkId of connectedLinks) {
      // Update items on link
      this.memory.pushLinkItems(linkId, items)

      // Update link counts
      const count = this.memory.getLinkCount(linkId)!
      this.memory.setLinkCount(linkId, count + items.length)
    }
  }

  /**
   * 
   * (Test) Utility to get items have been outputted through a port
   */
  itemsOutputtedThrough(name: PortName): ItemValue {
    const [connectedLink] = this.portLinkMap[name]

    return this.memory.getLinkItems(connectedLink) ?? []
  }
}