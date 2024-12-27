import { ItemValue } from '../types/ItemValue';
import { LinkId } from '../types/Link';
import { NodeId } from '../types/Node';
import { NodeStatus } from '../Executor';
import { ObserverStorage } from '../types/ObserverStorage';

/**
 * implementation of ObserverStorage using Maps
 */
export class DiagramObserverStorage implements ObserverStorage {

  constructor(
    private linkCountsStorage: Map<LinkId, number> = new Map(),
    private linkItemsStorage: Map<LinkId, ItemValue[]> = new Map(),
    private nodeStatusStorage: Map<NodeId, NodeStatus> = new Map()
  ) {}
  // Link Counts
  async getLinkCount(linkId: LinkId): Promise<number | undefined> {
    return this.linkCountsStorage.get(linkId);
  }

  async setLinkCount(linkId: LinkId, count: number): Promise<void> {
    this.linkCountsStorage.set(linkId, count);
  }

  // Link Items
  async getLinkItems(linkId: LinkId): Promise<ItemValue[] | undefined> {
    return this.linkItemsStorage.get(linkId);
  }

  async setLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    this.linkItemsStorage.set(linkId, items);
  }

  async appendLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    const currentItems = this.linkItemsStorage.get(linkId) ?? [];
    this.linkItemsStorage.set(linkId, currentItems.concat(items));
  }

  // Node Status
  async getNodeStatus(nodeId: NodeId): Promise<NodeStatus | undefined> {
    return this.nodeStatusStorage.get(nodeId);
  }

  async setNodeStatus(nodeId: NodeId, status: NodeStatus): Promise<void> {
    this.nodeStatusStorage.set(nodeId, status);
  }

}
