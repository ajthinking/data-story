import { LinkId } from './Link';
import { NodeId } from './Node';
import { PortId } from './PortId';

export enum RequestObserverType {
  observeLinkCounts = 'observeLinkCounts',
  observeLinkItems = 'observeLinkItems',
  observeLinkUpdate = 'observeLinkUpdate',
  observeNodeStatus = 'observeNodeStatus',
  cancelObservation = 'cancelObservation',
}
export type InputObserveConfig = {nodeId: NodeId, portId?: PortId, type: RequestObserverType}
| {linkId: LinkId, type: RequestObserverType};
