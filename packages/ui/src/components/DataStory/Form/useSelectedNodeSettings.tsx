import { ReactFlowNode } from '../../Node/ReactFlowNode';
import { StoreSchema, useStore } from '../store/store';
import { shallow } from 'zustand/shallow';
import { useLatest } from 'ahooks';
import { useEffect, useMemo } from 'react';
import { useUpdateNodeInternals } from '@xyflow/react';

export const useSelectedNodeSettings = ({ onSelectedNode, selectedNodeData }: {
  onSelectedNode?: (node?: ReactFlowNode) => void;
  selectedNodeData?: ReactFlowNode['data'];
}) => {
  const selector = (state: StoreSchema) => ({
    nodes: state.nodes,
    openNodeModalId: state.openNodeModalId,
    setOpenNodeModalId: state.setOpenNodeModalId,
  });

  const {
    nodes,
    openNodeModalId,
  } = useStore(selector, shallow);

  const latestNodes = useLatest(nodes);
  const node = useMemo(() => {
    return latestNodes.current.find((n) => n.id === openNodeModalId);
  }, [latestNodes, openNodeModalId]);

  const { updateNode } = useStore((state) => ({ updateNode: state.updateNode }), shallow);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if (!node) return;
    onSelectedNode?.(node);
  }, [node]);

  useEffect(() => {
    if (!node || !selectedNodeData) return;
    updateNode({
      ...node,
      data: selectedNodeData!
    });

    // Ensure ports are updated
    updateNodeInternals(node.id);
  }, [selectedNodeData]);
}
