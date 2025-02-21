import { SEdge, SNode } from '../../../SerializedReactFlow';

export const writeToClipboard = ({
  selectedNodes,
  selectedEdges,
}: {
  selectedNodes: SNode[];
  selectedEdges: SEdge[];
}) => {
  // Write to system clipboard
  navigator.clipboard.writeText(
    JSON.stringify({
      nodes: selectedNodes,
      edges: selectedEdges,
    }),
  );
}
export const readFromClipboard = async(): Promise<{ nodes: SNode[]; edges: SEdge[] }> => {
  let nodes: SNode[] = [];
  let edges: SEdge[] = [];
  try {
    // Read from system clipboard
    const text = await navigator.clipboard.readText();
    nodes = JSON.parse(text).nodes;
    edges = JSON.parse(text).edges;
  } catch(e) {
    console.error('Error reading from clipboard', e);
  }
  return { nodes, edges };
}