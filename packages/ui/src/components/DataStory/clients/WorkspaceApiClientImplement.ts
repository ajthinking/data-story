import { ClientRunParams } from '../types';
import {
  CancelObservation,
  Diagram,
  ObserveLinkItems,
  ItemValue,
  ObserveLinkCounts,
  NodeDescription,
  ObserveLinkUpdate,
  GetDataFromStorageParams,
  ObserveNodeStatus,
  LinkId,
} from '@data-story/core';
import { Subscription } from 'rxjs';

export interface WorkspaceApiClientImplement {
  run(params: ClientRunParams): void;
  getNodeDescriptions: ({ path }: { path?: string }) => Promise<NodeDescription[]>
  updateDiagram?: (diagram: Diagram, path?: string) => Promise<void>;
  getDiagram?: ({ diagramId }: { diagramId?: string }) => Promise<Diagram>;
  observeLinkCounts?:(params: ObserveLinkCounts) => Subscription;
  observeLinkItems?: (params: ObserveLinkItems) => Subscription;
  observeLinkUpdate?: (params: ObserveLinkUpdate) => Subscription;
  observeNodeStatus?: (params: ObserveNodeStatus) => Subscription;
  getDataFromStorage?: (params: GetDataFromStorageParams) => Promise<Record<LinkId, ItemValue[]>>;
  cancelObservation?:(params: CancelObservation) => Promise<void>;
  onEdgeDoubleClick?: (edgeId: string) => void;
  abortExecution?: (params: { executionId: string }) => Promise<void>;
}
