import { Application, Diagram, NodeDescription, Tree } from '@data-story/core';
import { WorkspaceApiJSClient } from '@data-story/ui';

export class MockJSClient extends WorkspaceApiJSClient {
  private diagram: Diagram;
  private nodeDescriptions: NodeDescription[];

  constructor(diagram?: Diagram, app?: Application, nodeDescriptions?: NodeDescription[]) {
    super(app);
    this.diagram = diagram ?? new Diagram();
    this.nodeDescriptions = nodeDescriptions || [];
  }

  getNodeDescriptions = async({ path }) => {
    return this.nodeDescriptions;
  };
  getTree = async({ path }) => {
    return Promise.resolve([{
      path: '/',
      type: 'file',
      content: this.diagram,
      id: 'root',
      name: '/',
      children: [],
    }] as Tree[]);
  }
}
