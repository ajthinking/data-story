import { RequestObserverType } from './InputObserveConfig';
import { NotifyObserversCallback } from './NotifyObserversCallback';

export type ItemsObserver = {
  type: RequestObserverType.itemsObserver,
  linkIds: string[],
  onReceive: NotifyObserversCallback,
  observerId?: string,
  direction?: 'pull' | 'push',
  onlyFirstNItems?: number,
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
  state?: 'running' | 'complete',
  observerId?: string,
  throttleMs?: number,
  msgId?: string,
  onReceive: (params:{
    links: LinkCountInfo[],
    // type: RequestObserverType.linkCountsObserver,
  }) => void,
}
export type NodeObserver = {
  type: 'NodeObserver',
  nodeId: string,
  onlyStatuses: string[],
  onlyOncePerStatus?: boolean,
  throttleMs?: number,
  onReceive: (data: any) => void,
}
export type ExecutionObserver = ItemsObserver | LinkCountsObserver;