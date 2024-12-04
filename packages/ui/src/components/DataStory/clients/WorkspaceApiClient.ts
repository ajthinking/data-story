import { ClientRunParams } from '../types';
import {
  CancelObserver,
  Diagram,
  ItemsObserver,
  ItemValue,
  LinkCountsObserver,
  NodeDescription,
  NotifyDataUpdate,
  GetDataFromStorage,
  LinkId
} from '@data-story/core';
import { Subscription } from 'rxjs';

export interface WorkspaceApiClient {
  run(params: ClientRunParams): void;
  getNodeDescriptions: ({ path }: {path?: string}) => Promise<NodeDescription[]>
  updateDiagram?: (diagram: Diagram) => Promise<void>;
  getDiagram?: ({ path }: {path?: string}) => Promise<Diagram>;
  linksCountObserver?:(params: LinkCountsObserver) => void;
  itemsObserver?: (params: ItemsObserver) => Subscription;
  cancelObserver?:(params: CancelObserver) => Promise<void>;
  notifyDataUpdate?: (params: NotifyDataUpdate) => Subscription;
  getDataFromStorage?: (params: GetDataFromStorage) => Promise<Record<LinkId, ItemValue[]>>;
}
