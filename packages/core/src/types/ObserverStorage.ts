import { ItemValue } from './ItemValue';
import { LinkId } from './Link';
import { NodeId } from './Node';
import { NodeStatus } from '../Executor';

/**
 * Interface for storage implementations used by InputObserverController
 */
export interface ObserverStorage {
  // Link Counts
  getLinkCount(linkId: LinkId): number | undefined;
  setLinkCount(linkId: LinkId, count: number): void;
  getAllLinkCounts(): Map<LinkId, number>;

  // Link Items
  getLinkItems(linkId: LinkId): ItemValue[] | undefined;
  setLinkItems(linkId: LinkId, items: ItemValue[]): void;
  appendLinkItems(linkId: LinkId, items: ItemValue[]): void;
  getAllLinkItems(): Map<LinkId, ItemValue[]>;

  // Node Status
  getNodeStatus(nodeId: NodeId): NodeStatus | undefined;
  setNodeStatus(nodeId: NodeId, status: NodeStatus): void;
  getAllNodeStatus(): Map<NodeId, NodeStatus>;
}
