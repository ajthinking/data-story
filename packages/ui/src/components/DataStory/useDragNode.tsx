import { useCallback, useState } from 'react';
import { useStoreApi } from '@xyflow/react';
import { useStore } from './store/store';
import { shallow } from 'zustand/shallow';
import { StoreSchema } from './types';
import { ReactFlowNode } from '../Node/ReactFlowNode';

/**
 * todo:
 * 1. 添加如 clone node， output input port 不为标准的端口名的支持 -get
 * 2. can't disconnect successfully
 * 3. BNode can't 顺滑的添加到 edge 上
 */

export function useDragNode() {
  const reactFlowStore = useStoreApi();
  const selector = (state: StoreSchema) => ({
    connect: state.connect,
    disconnect: state.disconnect,
    setEdges: state.setEdges,
  });
  const {
    connect,
    disconnect,
    setEdges,
  } = useStore(selector, shallow);

  const [draggedNode, setDraggedNode] = useState<{ node: any, droppedOnEdge: any } | null>(null);

  const onNodeDrag = useCallback((event: any, node: any) => {
    // Find any edges that the node is being dragged over
    const edgeElements = document.elementsFromPoint(event.clientX, event.clientY)
      .filter(el => el.classList.contains('react-flow__edge') ||
        el.classList.contains('react-flow__edge-path') ||
        el.classList.contains('react-flow__edge-text'));

    if (!edgeElements.length) {
      setDraggedNode(null);
      return;
    }
    // Get the closest edge element
    const edgeElement = edgeElements[0].closest('.react-flow__edge');
    const distance = Math.sqrt(
      Math.pow(edgeElements[0].getBoundingClientRect().x, 2) +
      Math.pow(edgeElements[0].getBoundingClientRect().y, 2),
    )

    console.log({ distance });
    if (edgeElement) {
      const edgeId = edgeElement.getAttribute('data-testid')?.replace('rf__edge-', '');
      const { edges } = reactFlowStore.getState();
      const edge = edges.find(e => e.id === edgeId);
      if (edge) {
        setDraggedNode({ node, droppedOnEdge: edge });
        return;
      }
    }

    setDraggedNode(null);
  }, []);

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