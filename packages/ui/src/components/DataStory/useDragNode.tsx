import { type MouseEvent as ReactMouseEvent, useCallback, useState } from 'react';
import { Edge } from '@xyflow/react';
import { StoreSchema } from './types';
import { ReactFlowNode } from '../Node/ReactFlowNode';

interface IntersectionResult {
  isIntersecting: boolean;
  edge?: Edge;
  edgeElement?: SVGPathElement;
}

function isIntersecting(
  edgeRect:  DOMRect,
  nodeRect:  DOMRect,
  threshold: number = 0.33,
): boolean {
  // check if there is any overlap.
  if (
    edgeRect.left > nodeRect.right ||
    edgeRect.right < nodeRect.left ||
    edgeRect.top > nodeRect.bottom ||
    edgeRect.bottom < nodeRect.top
  ) {
    return false;
  }

  // calculate the overlap area
  const overlapLeft = Math.max(edgeRect.left, nodeRect.left);
  const overlapRight = Math.min(edgeRect.right, nodeRect.right);
  const overlapTop = Math.max(edgeRect.top, nodeRect.top);
  const overlapBottom = Math.min(edgeRect.bottom, nodeRect.bottom);

  const overlapArea =
    (overlapRight - overlapLeft) * (overlapBottom - overlapTop);
  const nodeArea = nodeRect.width * nodeRect.height;

  // calculate the overlap ratio
  const overlapRatio = overlapArea / nodeArea;

  return overlapRatio > threshold;
}

export function useDragNode({
  connect,
  disconnect,
  edges,
}: {
  connect: StoreSchema['connect'];
  disconnect: StoreSchema['disconnect'];
  edges: StoreSchema['edges'];
}) {
  const [draggedNode, setDraggedNode] = useState<{ node: any, droppedOnEdge: any } | null>(null);

  const  checkNodeEdgeIntersection = useCallback((
    dragNodeRect: DOMRect,
  ): IntersectionResult => {
    for (const edge of edges) {
      const edgeElement = document.querySelector(
        `[data-id="${edge.id}"]`,
      ) as SVGPathElement;

      if (!edgeElement) continue;

      const edgeRect = edgeElement.getBoundingClientRect();
      const isEdgeCrossingNode = isIntersecting(edgeRect, dragNodeRect);

      if (isEdgeCrossingNode) {
        return {
          isIntersecting: true,
          edge,
          edgeElement: edgeElement,
        };
      }
    }

    return { isIntersecting: false };
  }, [edges.length]);

  const onNodeDrag = useCallback((event: ReactMouseEvent, node: ReactFlowNode) => {
    // @ts-ignore
    const nodeRect = event.target!.getBoundingClientRect() as unknown as DOMRect;

    const { edgeElement, edge, isIntersecting } = checkNodeEdgeIntersection(nodeRect);

    // The node must have inputs and outputs that can be connected
    const isConnected = node.data.inputs.length > 0 && node.data.outputs.length > 0;

    if (isConnected && isIntersecting) {
      edgeElement!.getAttribute('data-testid')?.replace('rf__edge-', '');
      setDraggedNode({ node, droppedOnEdge: edge });
      return;
    }

    setDraggedNode(null);
  }, [checkNodeEdgeIntersection]);

  const onNodeDragStop = useCallback((event: any, node: ReactFlowNode, nodes: ReactFlowNode[]) => {
    if (!draggedNode?.droppedOnEdge) return;
    const { node: node1, droppedOnEdge } = draggedNode;
    const nodeOutputId = node.data.outputs[0].id;
    const nodeInputId = node.data.inputs[0].id;

    connect({
      source: droppedOnEdge.source,
      target: node.id,
      sourceHandle: droppedOnEdge.sourceHandle,
      targetHandle: nodeInputId,
    });
    connect({
      source: node.id,
      target: droppedOnEdge.target,
      sourceHandle: nodeOutputId,
      targetHandle: droppedOnEdge.targetHandle,
    });

    disconnect(droppedOnEdge.id)
    setDraggedNode(null);
  }, [draggedNode, connect, disconnect]);

  return {
    onNodeDrag,
    onNodeDragStop,
    draggedNode,
  }
}