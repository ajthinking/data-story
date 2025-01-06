export enum RequestObserverType {
  observeLinkCounts = 'observeLinkCounts',
  observeLinkItems = 'observeLinkItems',
  observeLinkUpdate = 'observeLinkUpdate',
  observeNodeStatus = 'observeNodeStatus',
  cancelObservation = 'cancelObservation',
}
export type InputObserveConfig = {nodeId: string, portId?: string, type: RequestObserverType}
| {linkId: string, type: RequestObserverType};
