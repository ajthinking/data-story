import { ClientRunParams } from '../types';
import { Diagram, ItemsObserver, LinkCountsObserver, NodeDescription } from '@data-story/core';
import { Subscription } from 'rxjs';

export interface WorkspaceApiClient {
  run(params: ClientRunParams): void;
  getNodeDescriptions: ({ path }: {path?: string}) => Promise<NodeDescription[]>
  updateDiagram?: (diagram: Diagram) => Promise<void>;
  getDiagram?: ({ path }: {path?: string}) => Promise<Diagram>;
  linksCountObserver?:(params: LinkCountsObserver) => void;
  itemsObserver?: (params: ItemsObserver) => Subscription;
}
