import { WorkspacesApi } from './WorkspacesApi';
import { ClientRunParams } from '../types';

export interface WorkspaceApiClient {
  run(params: ClientRunParams): void;
  workspacesApi: WorkspacesApi;
}
