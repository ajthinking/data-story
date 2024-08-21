import { core, Diagram, multiline, NodeDescription, nodes } from '@data-story/core';
import { WorkspacesApi } from './WorkspacesApi';

export const createDiagram = () => {
  const { Signal, Comment, Ignore } = nodes;

  const diagram = core.getDiagramBuilder()
    .add({...Signal, label: 'DataSource'}, { period: 200, count: 100})
    .add({...Ignore, label: 'Storage'})
    .above('Signal.1').add(Comment, { content:'### Single Diagram 🔥'})
    .get();

  return diagram;
}

export class WorkspaceApiClient {
  workspacesApi: WorkspacesApi = {
    getNodeDescriptions: async({ path }) => {
      return [] as NodeDescription[]
    },
    getTree: async({ path }) => {
      const mockDiagram = createDiagram();
      // const treeJson = localStorage.getItem(path)
      // console.log('treeJson', treeJson)
      // if(treeJson) return parseDiagramTree(treeJson)

      // console.log('No tree found at path', path)
      // If no tree at path
      // For testing purposes: Persist and return a default tree
      const defaultTree = {
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
            content: mockDiagram,
          },
          {
            name: 'dev',
            id: 'dev',
            path: '/dev',
            type: 'file',
            content: new Diagram(),
          }
        ],
      }

      // localStorage.setItem(path, JSON.stringify(defaultTree))
      return defaultTree
    },
  } as WorkspacesApi
}
