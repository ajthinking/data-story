import { Diagram, get, NodeDescription } from '@data-story/core';
import { WorkspacesApi } from './WorkspacesApi';

export class JsClientV2 {
  workspacesApi: WorkspacesApi = {
    getNodeDescriptions: async ({ path }) => {
      return [] as NodeDescription[]
    },
    getTree: async ({ path }) => {
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
