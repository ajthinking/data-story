import { RequestObserverType } from './InputObserveConfig';
import { NotifyObserversCallback } from './NotifyObserversCallback';
import { LinkId } from './Link';
import { NodeStatus } from '../Executor';
import { NodeId } from './Node';

export type LinkItemsObserver = {
  type: RequestObserverType.linkItemsObserver,
  linkIds: string[],
  onReceive: NotifyObserversCallback,
  observerId: string,
  direction?: 'pull' | 'push',
  onlyFirstNItems?: number,
  throttleMs?: number,
  msgId?: string;
}

export interface LinkCountInfo {
  count: number;
  linkId: string;
}

export type LinkCountsObserver = {
  type: RequestObserverType.linkCountsObserver,
  linkIds: string[],
  observerId: string,
  throttleMs?: number,
  msgId?: string,
  onReceive: (params: {
    links: LinkCountInfo[],
  }) => void,
}

export type NodeStatusObserver = {
  type: RequestObserverType.nodeStatusObserver,
  nodeIds: NodeId[],
  observerId: string,
  throttleMs?: number,
  onReceive: (data: {
    nodes: {nodeId: NodeId, status: Omit<NodeStatus, 'AVAILABLE'>}[],
  }) => void,
}

export type LinkUpdateObserver = {
  type: RequestObserverType.linkUpdateObserver,
  linkIds: string[],
  observerId: string,
  onReceive: (linkIds: LinkId[]) => void,
  throttleMs?: number,
  msgId?: string,
  limit?: number,
  offset?: number,
}

export type CancelObserver = {
  type: RequestObserverType.cancelObserver,
  observerId: string,
}

export type ExecutionObserver = LinkItemsObserver | LinkCountsObserver | CancelObserver | LinkUpdateObserver | NodeStatusObserver;