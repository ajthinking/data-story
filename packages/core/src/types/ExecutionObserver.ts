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
export type LinkCountsObserver = {
  type: RequestObserverType.linkCountsObserver,
  linkIds: string[],
  observerId?: string,
  throttleMs?: number,
  onReceive: (count: number) => void,
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