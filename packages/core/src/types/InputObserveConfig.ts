export enum RequestObserverType {
  linkCountsObserver = 'linkCountsObserver',
  itemsObserver = 'itemsObserver',
  notifyDataUpdate = 'notifyDataUpdate',
  cancelObserver = 'cancelObserver',
}
export type InputObserveConfig = {nodeId: string, portId?: string, type: RequestObserverType}
| {linkId: string, type: RequestObserverType};
