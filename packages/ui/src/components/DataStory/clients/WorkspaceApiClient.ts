import { ClientRunParams, ItemsObserver, LinkCountsObserver } from '../types';
import { Diagram, NodeDescription } from '@data-story/core';
import { Observable } from 'rxjs';

export interface WorkspaceApiClient {
  run(params: ClientRunParams): void;
  getNodeDescriptions: ({ path }: {path?: string}) => Promise<NodeDescription[]>
  updateDiagram?: (diagram: Diagram) => Promise<void>;
  getDiagram?: ({ path }: {path?: string}) => Promise<Diagram>;
  linkCountsObserver?:(params: LinkCountsObserver) => Observable<number>;
  itemsObserver?: (params: ItemsObserver) => Observable<any>;
}
