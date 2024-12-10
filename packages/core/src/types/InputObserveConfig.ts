export enum RequestObserverType {
  linkCountsObserver = 'linkCountsObserver',
  linkItemsObserver = 'linkItemsObserver',
  linkUpdateObserver = 'linkUpdateObserver',
  nodeStatusObserver = 'nodeStatusObserver',
  cancelObserver = 'cancelObserver',
}
export type InputObserveConfig = {nodeId: string, portId?: string, type: RequestObserverType}
| {linkId: string, type: RequestObserverType};
