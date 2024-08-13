import { Diagram, get } from '@data-story/core';
import { WorkspacesApi } from './WorkspacesApi';

export class JsClientV2 {
  workspacesApi: WorkspacesApi = {
    get: async ({ path }) => {
      return {
        path: '/',
        type: 'folder',
        children: [
          {
            path: '/main',
            type: 'file',
            content: new Diagram(),
          }
        ],
      }
    },
  } as WorkspacesApi
}
