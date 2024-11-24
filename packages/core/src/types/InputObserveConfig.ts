export enum RequestObserverType {
  // 'LinkCountsObserver' | 'ItemsObserver' | 'NotifyDataUpdate'
  LinkCountsObserver = 'LinkCountsObserver',
  ItemsObserver = 'ItemsObserver',
  NotifyDataUpdate = 'NotifyDataUpdate',
}
export type InputObserveConfig = {nodeId: string, portId?: string, type: RequestObserverType}
| {linkId: string, type: RequestObserverType};
