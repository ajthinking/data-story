import { Connection } from 'reactflow';
import { NodeDescription, PortWithSchema } from "@data-story/core";
import { DataStoryNode } from '../../Node/DataStoryNode';
import { guessConnection } from './guessConnection';
import { guessPosition } from './guessPosition';

export const makeNodeAndConnection = (
  existingNodes: DataStoryNode[],
  nodeDescription: NodeDescription
): [DataStoryNode, Connection | null] => {
  const scopedId = (name: string) => {
    const max = existingNodes
      .filter((node) => node.data.computer === name)
      .map((node) => node.id)
      .map((id) => id.split('.')[1])
      .map((id) => parseInt(id))
      .reduce((max, id) => Math.max(max, id), 0)

    return max + 1      
  }

  const counter = scopedId(nodeDescription.name)
  const id = `${nodeDescription.name}.${counter}`;  

  const node = {
    id,
    position: guessPosition(existingNodes, nodeDescription),
    data: {
      // Ensure two nodes of same type don't share the same params object
      params: structuredClone(nodeDescription.params),
      computer: nodeDescription.name,
      label: nodeDescription.label ?? nodeDescription.name,
      inputs: nodeDescription.inputs.map((input: PortWithSchema) => {
        return {
          id: `${id}.${input.name}`,
          ...input
        }
      }),
      outputs: nodeDescription.outputs.map((output: PortWithSchema) => {
        return {
          id: `${id}.${output.name}`,
          ...output
        }
      }),
    },
    selected: true,
    type: {
      Comment: "dataStoryCommentNodeComponent",
      //Input: "dataStoryInputNodeComponent",
      //Output: "dataStoryOutputNodeComponent",
    }[nodeDescription.name] ?? "dataStoryNodeComponent",
  }

  const connection = guessConnection(existingNodes, node)

  return [node, connection]
}

// const connection: {
//   id: string;
//   sourceHandle: string | undefined;
//   targetHandle: string | undefined;
//   source: string;
//   target: string;
// } | null