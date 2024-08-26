import { Application, core, coreNodeProvider, Diagram, nodes } from '@data-story/core';
import { WorkspacesApi } from './WorkspacesApi';

export const createDiagram = (content = 'Diagram') => {
  const { Signal, Comment, Ignore } = nodes;

  const diagram = core.getDiagramBuilder()
    .add({...Signal, label: 'DataSource'}, { period: 200, count: 100})
    .add({...Ignore, label: 'Storage'})
    .above('Signal.1').add(Comment, { content: `### ${content} 🔥`})
    .get();

  return diagram;
}

export class WorkspaceApiClient {
  workspacesApi: WorkspacesApi = {
    getNodeDescriptions: async({ path }) => {
      const app = new Application();
      app.register(coreNodeProvider);
      app.boot();
      const nodeDescriptions = app.descriptions();

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(nodeDescriptions);
        }, 1000);
      });
    },

    getTree: async({ path }) => {
      // const treeJson = localStorage.getItem(path)
      // console.log('treeJson', treeJson)
      // if(treeJson) return parseDiagramTree(treeJson)

      // console.log('No tree found at path', path)
      // If no tree at path
      // For testing purposes: Persist and return a default tree
      const defaultTree = [{
        path: '/',
        type: 'folder',
        name: '/',
        id: 'root',
        children: [
          {
            name: 'main',
            id: 'main',
            path: '/main',
            type: 'file',
            content: createDiagram('main diagram'),
          },
          {
            name: 'dev',
            id: 'dev',
            path: '/dev',
            type: 'file',
            content: new Diagram(),
          }
        ],
      },
      {
        path: '/branch',
        type: 'file',
        id: 'branch',
        name: 'branch',
        content: createDiagram(' branch diagram'),
      }
      ];
      // localStorage.setItem(path, JSON.stringify(defaultTree))
      return defaultTree
    },
  } as WorkspacesApi
}
