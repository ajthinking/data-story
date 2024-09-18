import { Application, coreNodeProvider, Diagram, NodeDescription } from '@data-story/core';
import { WorkspaceApiJSClient } from '@data-story/ui';

export class MockJSClient extends WorkspaceApiJSClient {
  private diagram: Diagram;
  private nodeDescriptions: NodeDescription[];

  constructor({ diagram, app, nodeDescriptions }: {
    app: Application,
    diagram?: Diagram,
    nodeDescriptions?: NodeDescription[]
  }) {
    super(app);
    this.diagram = diagram ?? new Diagram();
    this.nodeDescriptions = nodeDescriptions || [];
  }

  getNodeDescriptions = async({ path }) => {
    return this.nodeDescriptions;
  };
}
