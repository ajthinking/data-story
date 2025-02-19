import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Node,
  useKeyPress,
  useReactFlow,
  getConnectedEdges,
  Edge,
  XYPosition,
  useStore,
  type KeyCode,
} from '@xyflow/react';

export function useCopyPaste<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge
>() {
  const { getNodes, setNodes, getEdges, setEdges, screenToFlowPosition } = useReactFlow<NodeType, EdgeType>();
  const mousePosRef = useRef<XYPosition>({ x: 0, y: 0 });
  const rfDomNode = useStore((state) => state.domNode);
  const [bufferedNodes, setBufferedNodes] = useState<NodeType[]>([]);
  const [bufferedEdges, setBufferedEdges] = useState<EdgeType[]>([]);

  // Event handling setup
  useEffect(() => {
    if (!rfDomNode) return;

    // Listen for mouse move events on the DOM node and disable the default actions for cut, copy, and paste
    const handleMouseMove = (event: MouseEvent) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };
    };

    const preventDefault = (e: Event) => e.preventDefault();
    const events: (keyof HTMLElementEventMap)[] = ['cut', 'copy', 'paste'];

    events.forEach(event => rfDomNode.addEventListener(event, preventDefault));
    rfDomNode.addEventListener('mousemove', handleMouseMove);

    // Listen for keydown events on the DOM node and disable the default action for select all
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
      }
    };

    rfDomNode.addEventListener('keydown', handleKeyDown);
    return () => {
      events.forEach(event => rfDomNode.removeEventListener(event, preventDefault));
      rfDomNode.removeEventListener('mousemove', handleMouseMove);
      rfDomNode.removeEventListener('keydown', handleKeyDown);
    };
  }, [rfDomNode]);

  const getSelectedNodesAndEdges = useCallback(() => {
    const selectedNodes = getNodes().filter(node => node.selected);
    const isEdgeInternal = (edge: EdgeType) =>
      selectedNodes.some(n => n.id === edge.source) &&
      selectedNodes.some(n => n.id === edge.target);

    return {
      nodes: selectedNodes,
      edges: getConnectedEdges(selectedNodes, getEdges()).filter(isEdgeInternal),
    };
  }, [getNodes, getEdges]);

  const copy = useCallback(() => {
    const { nodes, edges } = getSelectedNodesAndEdges();
    setBufferedNodes(nodes);
    setBufferedEdges(edges as EdgeType[]);
  }, [getSelectedNodesAndEdges]);

  const cut = useCallback(() => {
    const { nodes, edges } = getSelectedNodesAndEdges();
    setBufferedNodes(nodes);
    setBufferedEdges(edges as EdgeType[]);

    setNodes(nodes => nodes.filter(node => !node.selected));
    setEdges(edges => edges.filter(edge => !(edges as EdgeType[]).includes(edge as EdgeType)));
  }, [getSelectedNodesAndEdges, setNodes, setEdges]);

  const paste = useCallback((position = screenToFlowPosition(mousePosRef.current)) => {
    const now = Date.now();
    const generateCopiedId = (originalId: string) => `${originalId}-${now}`;

    const calculateNewPosition = (originalPos: XYPosition) => ({
      x: position.x + (originalPos.x - Math.min(...bufferedNodes.map(n => n.position.x))),
      y: position.y + (originalPos.y - Math.min(...bufferedNodes.map(n => n.position.y))),
    });

    const newNodes = bufferedNodes.map(node => ({
      ...node,
      id: generateCopiedId(node.id),
      position: calculateNewPosition(node.position),
      selected: true,
    }));

    const newEdges = bufferedEdges.map(edge => ({
      ...edge,
      id: generateCopiedId(edge.id),
      source: generateCopiedId(edge.source),
      target: generateCopiedId(edge.target),
      selected: true,
    }));

    setNodes(nodes => [...nodes.map(n => ({ ...n, selected: false })), ...newNodes]);
    setEdges(edges => [...edges.map(e => ({ ...e, selected: false })), ...newEdges]);
  }, [bufferedNodes, bufferedEdges, screenToFlowPosition, setNodes, setEdges]);

  const selectAll = useCallback(() => {
    setNodes(nodes => nodes.map(node => ({ ...node, selected: true })));
    setEdges(edges => edges.map(edge => ({ ...edge, selected: true })));
  }, [setNodes, setEdges]);

  useKeyboardShortcut(['Meta+x', 'Control+x'], cut);
  useKeyboardShortcut(['Meta+c', 'Control+c'], copy);
  useKeyboardShortcut(['Meta+v', 'Control+v'], paste);
  useKeyboardShortcut(['Meta+a', 'Control+a'], selectAll);

  return { cut, copy, paste, bufferedNodes, bufferedEdges };
}

function useKeyboardShortcut(keyCode: KeyCode, handler: () => void) {
  const [keyPressed, setKeyPressed] = useState(false);
  const isPressed = useKeyPress(keyCode);

  useEffect(() => {
    if (isPressed && !keyPressed) {
      handler();
      setKeyPressed(true);
    } else if (!isPressed && keyPressed) {
      setKeyPressed(false);
    }
  }, [isPressed, keyPressed, handler]);
}
