import { ClientRunParams } from '../types';
import {
  CancelObservation,
  Diagram,
  ObserveLinkItems,
  ItemValue,
  ObservelinkCounts,
  NodeDescription,
  ObserveLinkUpdate,
  GetDataFromStorage,
  ObserveNodeStatus,
  LinkId
} from '@data-story/core';
import { Subscription } from 'rxjs';

export interface WorkspaceApiClientImplement {
  run(params: ClientRunParams): void;
  getNodeDescriptions: ({ path }: {path?: string}) => Promise<NodeDescription[]>
  updateDiagram?: (diagram: Diagram) => Promise<void>;
  getDiagram?: ({ path }: {path?: string}) => Promise<Diagram>;
  observeLinkCounts?:(params: ObservelinkCounts) => Subscription;
  observeLinkItems?: (params: ObserveLinkItems) => Subscription;
  observeLinkUpdate?: (params: ObserveLinkUpdate) => Subscription;
  observeNodeStatus?: (params: ObserveNodeStatus) => Subscription;
  getDataFromStorage?: (params: GetDataFromStorage) => Promise<Record<LinkId, ItemValue[]>>;
  cancelObservation?:(params: CancelObservation) => Promise<void>;
}
