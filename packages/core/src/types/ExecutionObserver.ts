import { RequestObserverType } from './InputObserveConfig';
import { NotifyObserversCallback } from './NotifyObserversCallback';
import { LinkId } from './Link';
import { NodeStatus } from '../Executor';
import { NodeId } from './Node';

export type ObserveLinkItems = {
  type: RequestObserverType.observeLinkItems,
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

export type ObservelinkCounts = {
  type: RequestObserverType.observelinkCounts,
  linkIds: string[],
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
  linkIds: string[],
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

export type ExecutionObserver = ObserveLinkItems | ObservelinkCounts | CancelObservation | ObserveLinkUpdate | ObserveNodeStatus;