import { RequestObserverType } from './InputObserveConfig';
import { NotifyObserversCallback } from './NotifyObserversCallback';
import { LinkCount, LinkId } from './Link';
import { NodeStatus } from '../Executor';
import { NodeId } from './Node';

export type ObserveLinkItems = {
  type: RequestObserverType.observeLinkItems,
  linkIds: LinkId[],
  onReceive: NotifyObserversCallback,
  observerId: string,
  direction?: 'pull' | 'push',
  onlyFirstNItems?: number,
  throttleMs?: number,
  msgId?: string;
}

export interface LinkCountInfo {
  count: LinkCount;
  linkId: LinkId;
}

export type ObserveLinkCounts = {
  type: RequestObserverType.observeLinkCounts,
  linkIds: LinkId[],
  observerId: string,
  throttleMs?: number,
  msgId?: string,
  onReceive: (params: {
    links: LinkCountInfo[],
  }) => void,
}

export type ObserveNodeStatus = {
  type: RequestObserverType.observeNodeStatus,
  nodeIds: NodeId[],
  observerId: string,
  throttleMs?: number,
  msgId?: string,
  onReceive: (data: {
    nodes: {nodeId: NodeId, status: Omit<NodeStatus, 'AVAILABLE'>}[],
  }) => void,
}

export type ObserveLinkUpdate = {
  type: RequestObserverType.observeLinkUpdate,
  linkIds: LinkId[],
  observerId: string,
  onReceive: (linkIds: LinkId[]) => void,
  throttleMs?: number,
  msgId?: string,
  limit?: number,
  offset?: number,
}

export type CancelObservation = {
  type: RequestObserverType.cancelObservation,
  observerId: string,
  msgId?: string
}

export type ExecutionObserver = ObserveLinkItems | ObserveLinkCounts | CancelObservation | ObserveLinkUpdate | ObserveNodeStatus;