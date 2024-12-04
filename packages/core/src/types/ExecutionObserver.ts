import { RequestObserverType } from './InputObserveConfig';
import { NotifyObserversCallback } from './NotifyObserversCallback';

export type ItemsObserver = {
  type: RequestObserverType.itemsObserver,
  linkIds: string[],
  onReceive: NotifyObserversCallback,
  observerId: string,
  direction?: 'pull' | 'push',
  onlyFirstNItems?: number,
  limit?: number,
  offset?: number,
  throttleMs?: number,
  msgId?: string;
}

export interface LinkCountInfo {
  count: number;
  linkId: string;
  state?: 'running' | 'complete';
}

export type LinkCountsObserver = {
  type: RequestObserverType.linkCountsObserver,
  linkIds: string[],
  observerId: string,
  state?: 'running' | 'complete',
  throttleMs?: number,
  msgId?: string,
  onReceive: (params:{
    links: LinkCountInfo[],
  }) => void,
}

export type NodeObserver = {
  type: RequestObserverType.notifyDataUpdate,
  nodeId: string,
  onlyStatuses: string[],
  onlyOncePerStatus?: boolean,
  throttleMs?: number,
  onReceive: (data: any) => void,
}

export type CancelObserver = {
  type: RequestObserverType.cancelObserver,
  observerId: string,
}

export type ExecutionObserver = ItemsObserver | LinkCountsObserver | CancelObserver;