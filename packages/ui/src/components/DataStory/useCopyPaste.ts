import { useCallback, useEffect, useRef, useState } from 'react';
import { getConnectedEdges, type KeyCode, useKeyPress, useReactFlow, useStore, XYPosition } from '@xyflow/react';
import { SEdge, SNode } from '../../SerializedReactFlow';
import { readFromClipboard, writeToClipboard } from './common/clipboard';

export function useCopyPaste() {
  const {
    getNodes,
    setNodes,
    getEdges,
    setEdges,
    screenToFlowPosition,
  } = useReactFlow<SNode, SEdge>();
  const mousePosRef = useRef<XYPosition>({ x: 0, y: 0 });
  const rfDomNode = useStore((state) => state.domNode);
  const [bufferedNodes, setBufferedNodes] = useState<SNode[]>([]);
  const [bufferedEdges, setBufferedEdges] = useState<SEdge[]>([]);

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
    // the edge is internal if both source and target nodes are selected
    const isEdgeInternal = (edge: SEdge) =>
      selectedNodes.some(n => n.id === edge.source) &&
      selectedNodes.some(n => n.id === edge.target);

    return {
      selectedNodes: selectedNodes,
      // Filter out the internal edges connected to the selected nodes that have nodes on both ends
      selectedEdges: getConnectedEdges(selectedNodes, getEdges()).filter(isEdgeInternal),
    };
  }, [getNodes, getEdges]);
  const copy = useCallback(() => {
    const { selectedNodes, selectedEdges } = getSelectedNodesAndEdges();
    writeToClipboard({ selectedNodes, selectedEdges });

    setBufferedNodes(selectedNodes);
    setBufferedEdges(selectedEdges);
  }, [getSelectedNodesAndEdges]);

  const cut = useCallback(() => {
    const { selectedNodes, selectedEdges } = getSelectedNodesAndEdges();
    writeToClipboard({ selectedNodes, selectedEdges });

    setBufferedNodes(selectedNodes);
    setBufferedEdges(selectedEdges);

    // Existing cut logic
    setNodes(nodes => nodes.filter(node => !node.selected));
    setEdges(edges => {
      return edges.filter(edge => {
        return !selectedEdges.some(selectedEdge => edge.id === selectedEdge.id);
      });
    });
  }, [getSelectedNodesAndEdges, setNodes, setEdges]);

  const paste = useCallback(async (position = screenToFlowPosition(mousePosRef.current)) => {
    const now = Date.now();
    const generateCopiedId = (originalId: string) => `${originalId}-${now}`;

    const { nodes, edges } = await readFromClipboard();
    const copiedNodes = nodes;
    const copiedEdges = edges;
    // const copiedNodes = bufferedNodes;
    // const copiedEdges = bufferedEdges;
    const calculateNewPosition = (originalPos: XYPosition) => ({
      x: position.x + (originalPos.x - Math.min(...copiedNodes.map(n => n.position.x))),
      y: position.y + (originalPos.y - Math.min(...copiedNodes.map(n => n.position.y))),
    });

    const newNodes = copiedNodes.map(node => ({
      ...structuredClone(node),
      id: generateCopiedId(node.id),
      position: calculateNewPosition(node.position),
      selected: true,
      data: {
        ...structuredClone(node.data),
        inputs: (node.data.inputs as Record<string, unknown>[] || [])?.map(input => ({
          ...input,
          id: `${generateCopiedId(node.id)}.${(input.id as string).split('.').pop()}`,
        })),
        outputs: (node.data.outputs as Record<string, unknown>[] || [])?.map(output => ({
          ...output,
          id: `${generateCopiedId(node.id)}.${(output.id as string).split('.').pop()}`,
        })),
      },
    })) as SNode[];

    const newEdges = copiedEdges.map(edge => ({
      ...structuredClone(edge),
      id: generateCopiedId(edge.id),
      source: generateCopiedId(edge.source),
      sourceHandle: `${generateCopiedId(edge.source)}.${edge.sourceHandle!.split('.').pop()}`,
      target: generateCopiedId(edge.target),
      targetHandle: `${generateCopiedId(edge.target)}.${edge.targetHandle!.split('.').pop()}`,
      selected: true,
    })) as SEdge[];

    setNodes(nodes => [...nodes.map(node => ({ ...node, selected: false })), ...newNodes]);
    setEdges(edges => [...edges.map(edge => ({ ...edge, selected: false })), ...newEdges]);
  }, [bufferedNodes, bufferedEdges, screenToFlowPosition, setNodes, setEdges]);

  const selectAll = useCallback(() => {
    setNodes(nodes => nodes.map(node => ({ ...node, selected: true })));
    setEdges(edges => edges.map(edge => ({ ...edge, selected: true })));
  }, [setNodes, setEdges]);

  useKeyboardShortcut(['Meta+x', 'Control+x'], cut, rfDomNode);
  useKeyboardShortcut(['Meta+c', 'Control+c'], copy, rfDomNode);
  useKeyboardShortcut(['Meta+v', 'Control+v'], paste, rfDomNode);
  useKeyboardShortcut(['Meta+a', 'Control+a'], selectAll, rfDomNode);

  return { cut, copy, paste, bufferedNodes, bufferedEdges };
}

function useKeyboardShortcut(keyCode: KeyCode, handler: () => void, rfDomNode: HTMLElement | null) {
  const [keyPressed, setKeyPressed] = useState(false);
  const isPressed = useKeyPress(keyCode, { target: rfDomNode });

  useEffect(() => {
    if (isPressed && !keyPressed) {
      handler();
      setKeyPressed(true);
    } else if (!isPressed && keyPressed) {
      setKeyPressed(false);
    }
  }, [isPressed, keyPressed, handler, rfDomNode]);
}
