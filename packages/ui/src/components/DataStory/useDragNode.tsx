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
  // 首先检查是否有重叠
  if (
    edgeRect.left > nodeRect.right ||
    edgeRect.right < nodeRect.left ||
    edgeRect.top > nodeRect.bottom ||
    edgeRect.bottom < nodeRect.top
  ) {
    return false;
  }

  // 计算重叠区域
  const overlapLeft = Math.max(edgeRect.left, nodeRect.left);
  const overlapRight = Math.min(edgeRect.right, nodeRect.right);
  const overlapTop = Math.max(edgeRect.top, nodeRect.top);
  const overlapBottom = Math.min(edgeRect.bottom, nodeRect.bottom);

  // 计算重叠面积
  const overlapArea =
    (overlapRight - overlapLeft) * (overlapBottom - overlapTop);

  // 计算节点总面积
  const nodeArea = nodeRect.width * nodeRect.height;

  // 计算重叠比例
  const overlapRatio = overlapArea / nodeArea;

  return overlapRatio > threshold;
}

export function useDragNode({
  connect,
  disconnect,
  setEdges,
  edges,
}: {
  connect: StoreSchema['connect'];
  disconnect: StoreSchema['disconnect'];
  setEdges: StoreSchema['setEdges'];
  edges: StoreSchema['edges'];
}) {
  const [draggedNode, setDraggedNode] = useState<{ node: any, droppedOnEdge: any } | null>(null);

  const  checkNodeEdgeIntersection = useCallback((
    dragNodeRect: DOMRect,
  ): IntersectionResult => {
    // 遍历所有边，检查是否有相交
    for (const edge of edges) {
      const edgeElement = document.querySelector(
        `[data-id="${edge.id}"]`,
      ) as SVGPathElement;

      if (!edgeElement) continue;

      // 获取边的边界矩形
      const edgeRect = edgeElement.getBoundingClientRect();

      const isEdgeCrossingNode =isIntersecting(edgeRect, dragNodeRect);

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

    if (edgeElement && edge) {
      const edgeId = edgeElement.getAttribute('data-testid')?.replace('rf__edge-', '');
      console.log(edgeId, 'edgeId');
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