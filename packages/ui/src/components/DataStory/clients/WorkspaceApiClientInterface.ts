import { WorkspacesApi } from './WorkspacesApi';
import { ClientRunParams } from '../types';

export interface WorkspaceApiClientInterface {
  run(params: ClientRunParams): void;
  workspacesApi: WorkspacesApi;
}