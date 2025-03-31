import { ItemValue } from './ItemValue';
import { LinkId } from './Link';
import { NodeId } from './Node';
import { NodeStatus } from '../Executor';

/**
 * Type for diagram identifiers used in storage
 */
export type DiagramId = string;

/**
 * Interface for storage implementations used by ObserverController
 */
export type GetLinkItemsParams = {
  linkId: LinkId;
  offset: number;
  limit: number;
};

export interface ObserverStorage {
  // Link Counts
  getLinkCount(linkId: LinkId): Promise<number | undefined>;
  setLinkCount(linkId: LinkId, count: number): Promise<void>;

  // Link Items
  getLinkItems(params: GetLinkItemsParams): Promise<ItemValue[] | undefined>;
  setLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void>;
  appendLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void>;

  // Node Status
  getNodeStatus(nodeId: NodeId): Promise<NodeStatus | undefined>;
  setNodeStatus(nodeId: NodeId, status: NodeStatus): Promise<void>;

  // create optional init method
  init?(): Promise<void>;
  close(): Promise<void>;
}
