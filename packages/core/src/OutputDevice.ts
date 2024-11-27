import { LinkId } from './types/Link'
import { ItemValue } from './types/ItemValue'
import { PortId } from './types/PortId'
import { ExecutionMemory } from './ExecutionMemory'
import { ItemWithParams, isItemWithParams } from './ItemWithParams'
import { PortName } from './types/Port'
import { Node } from './types/Node';

type LinkItems = Record<LinkId, ItemValue[]>

export type OutputTree = Record<PortId, LinkItems>

export type PortLinkMap = Record<PortName, LinkId[]>

const formatItems = (items: ItemValue[]): ItemValue[] => {
  try {
    return structuredClone(items);
  } catch (e) {
    try {
      return JSON.parse(JSON.stringify(items));
    } catch (jsonError) {
      throw new Error(`
        Items are not serializable: ${jsonError}
        Items might not be structured cloneable.
      `);
    }
  }
};

export class OutputDevice {
  constructor(
    private portLinkMap: PortLinkMap = {},
    private memory: ExecutionMemory,
    private node: Node
  ) {}

  getPortNames(): string[] {
    return Object.keys(this.portLinkMap)
  }

  push(items: ItemValue[]) {
    return this.pushTo('output', items)
  }

  pushTo(name: PortName, itemable: (ItemValue | ItemWithParams)[]) {
    const connectedLinks = this.portLinkMap[name]

    // When outputting we should not be in a params infused ItemWithParams
    const items = itemable.map(i => isItemWithParams(i) ? i.value : i)

    for(const linkId of connectedLinks) {
      const formattedItems =  formatItems(items);
      // Update items on link
      this.memory.pushLinkItems(
        linkId,
        // Clone items to ensure induvidual mutation per branch
        formattedItems
      )
      // console.log('OutputDevice pushTo linkId:', linkId, 'formattedItems', formattedItems);
      // Update link counts
      const count = this.memory.getLinkCount(linkId)!
      this.memory.setLinkCount(linkId, count + items.length);
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
