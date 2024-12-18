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
  getLinkCount(linkId: LinkId): number | undefined {
    return this.linkCountsStorage.get(linkId);
  }

  setLinkCount(linkId: LinkId, count: number): void {
    this.linkCountsStorage.set(linkId, count);
  }

  getAllLinkCounts(): Map<LinkId, number> {
    return this.linkCountsStorage;
  }

  // Link Items
  getLinkItems(linkId: LinkId): ItemValue[] | undefined {
    return this.linkItemsStorage.get(linkId);
  }

  setLinkItems(linkId: LinkId, items: ItemValue[]): void {
    this.linkItemsStorage.set(linkId, items);
  }

  appendLinkItems(linkId: LinkId, items: ItemValue[]): void {
    const currentItems = this.linkItemsStorage.get(linkId) ?? [];
    this.linkItemsStorage.set(linkId, currentItems.concat(items));
  }

  getAllLinkItems(): Map<LinkId, ItemValue[]> {
    return this.linkItemsStorage;
  }

  // Node Status
  getNodeStatus(nodeId: NodeId): NodeStatus | undefined {
    return this.nodeStatusStorage.get(nodeId);
  }

  setNodeStatus(nodeId: NodeId, status: NodeStatus): void {
    this.nodeStatusStorage.set(nodeId, status);
  }

  getAllNodeStatus(): Map<NodeId, NodeStatus> {
    return this.nodeStatusStorage;
  }
}
