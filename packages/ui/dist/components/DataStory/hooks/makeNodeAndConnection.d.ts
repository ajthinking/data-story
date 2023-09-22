import { Connection } from 'reactflow';
import { Diagram, NodeDescription } from "@data-story/core";
import { DataStoryNode } from '../../Node/DataStoryNode';
export declare const makeNodeAndConnection: (diagram: Diagram, nodeDescription: NodeDescription) => [DataStoryNode, Connection | null];
