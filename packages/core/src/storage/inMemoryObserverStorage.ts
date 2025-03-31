import { ItemValue } from '../types/ItemValue';
import { LinkId } from '../types/Link';
import { NodeId } from '../types/Node';
import { NodeStatus } from '../Executor';
import { DiagramId, GetLinkItemsParams, ObserverStorage } from '../types/ObserverStorage';

/**
 * implementation of ObserverStorage using Maps
 */
export class InMemoryObserverStorage implements ObserverStorage {
  private diagramId: DiagramId;
  private linkCountsStorage: Map<LinkId, number> = new Map()
  private linkItemsStorage: Map<LinkId, ItemValue[]> = new Map()
  private nodeStatusStorage: Map<NodeId, NodeStatus> = new Map()

  constructor(diagramId: DiagramId) {
    this.diagramId = diagramId;
  }

  // Link Counts
  async getLinkCount(linkId: LinkId): Promise<number | undefined> {
    return this.linkCountsStorage.get(linkId);
  }

  async setLinkCount(linkId: LinkId, count: number): Promise<void> {
    this.linkCountsStorage.set(linkId, count);
  }

  async setLinkCounts(counts: Map<LinkId, number>): Promise<void> {
    this.linkCountsStorage = counts;
  }

  // Link Items
  async getLinkItems({ linkId, offset, limit }: GetLinkItemsParams): Promise<ItemValue[] | undefined> {
    const storageItems = this.linkItemsStorage.get(linkId)?.slice(offset, offset + limit);
    return storageItems ?? [];
  }

  async setLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    this.linkItemsStorage.set(linkId, items);
  }

  async setLinksItems(linksItems: Map<LinkId, ItemValue[]>): Promise<void> {
    this.linkItemsStorage = linksItems;
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

  async setNodeStatuses(statuses: Map<NodeId, NodeStatus>): Promise<void> {
    this.nodeStatusStorage = statuses;
  }

  async close(): Promise<void> {
    this.linkCountsStorage.clear();
    this.linkItemsStorage.clear();
    this.nodeStatusStorage.clear();
  }

}
