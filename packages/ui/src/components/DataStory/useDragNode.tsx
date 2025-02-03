import { type MouseEvent as ReactMouseEvent, useCallback, useState } from 'react';
import { Edge } from '@xyflow/react';
import { StoreSchema } from './types';
import { ReactFlowNode } from '../Node/ReactFlowNode';

interface IntersectionResult {
  isIntersecting: boolean;
  edge?: Edge;
  edgeElement?: SVGPathElement;
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
    threshold: number = 0,
  ): IntersectionResult => {
    // 遍历所有边，检查是否有相交
    for (const edge of edges) {
      // 获取边的 DOM 元素
      const edgeElement = document.querySelector(
        `[data-id="${edge.id}"]`,
      ) as SVGPathElement;

      console.log(edgeElement, 'edgeElement');
      if (!edgeElement) continue;

      // 获取边的边界矩形
      const edgeRect = edgeElement.getBoundingClientRect();

      // 检查矩形是否相交
      const isIntersecting = !(
        dragNodeRect.right < edgeRect.left - threshold ||
        dragNodeRect.left > edgeRect.right + threshold ||
        dragNodeRect.bottom < edgeRect.top - threshold ||
        dragNodeRect.top > edgeRect.bottom + threshold
      );

      if (isIntersecting) {
        return {
          isIntersecting: true,
          edge,
          edgeElement: edgeElement,
        };
      }
    }

    return { isIntersecting: false };
  }, [edges]);

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
  }, [draggedNode, connect, setEdges]);

  return {
    onNodeDrag,
    onNodeDragStop,
    draggedNode,
  }
}