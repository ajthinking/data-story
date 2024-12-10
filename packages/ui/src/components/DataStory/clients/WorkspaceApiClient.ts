import { ClientRunParams } from '../types';
import {
  CancelObserver,
  Diagram,
  LinkItemsObserver,
  ItemValue,
  LinkCountsObserver,
  NodeDescription,
  LinkUpdateObserver,
  GetDataFromStorage,
  NodeStatusObserver,
  LinkId
} from '@data-story/core';
import { Subscription } from 'rxjs';

export interface WorkspaceApiClient {
  run(params: ClientRunParams): void;
  getNodeDescriptions: ({ path }: {path?: string}) => Promise<NodeDescription[]>
  updateDiagram?: (diagram: Diagram) => Promise<void>;
  getDiagram?: ({ path }: {path?: string}) => Promise<Diagram>;
  linksCountObserver?:(params: LinkCountsObserver) => void;
  linkItemsObserver?: (params: LinkItemsObserver) => Subscription;
  cancelObserver?:(params: CancelObserver) => Promise<void>;
  linkUpdateObserver?: (params: LinkUpdateObserver) => Subscription;
  getDataFromStorage?: (params: GetDataFromStorage) => Promise<Record<LinkId, ItemValue[]>>;
  nodeStatusObserver?:(params: NodeStatusObserver) => Subscription;
}
