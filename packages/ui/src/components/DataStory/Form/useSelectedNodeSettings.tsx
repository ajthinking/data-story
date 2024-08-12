import { ReactFlowNode } from '../../Node/ReactFlowNode';
import { useStore } from '../store/store';
import { shallow } from 'zustand/shallow';
import { useLatest } from 'ahooks';
import { useEffect, useMemo } from 'react';
import { useUpdateNodeInternals } from '@xyflow/react';
import { StoreSchema } from '../types';

export const useSelectedNodeSettings = ({ onSelectedNode, selectedNodeData, selectedNode }: {
  onSelectedNode?: (node?: ReactFlowNode) => void;
  selectedNodeData?: ReactFlowNode['data'];
  selectedNode?: ReactFlowNode
}) => {
  const selector = (state: StoreSchema) => ({
    nodes: state.nodes,
    openNodeModalId: state.openNodeModalId,
    setOpenNodeModalId: state.setOpenNodeModalId,
  });

  const {
    nodes,
    openNodeModalId,
    setOpenNodeModalId
  } = useStore(selector, shallow);

  const latestNodes = useLatest(nodes);
  const node = useMemo(() => {
    return latestNodes.current.find((n) => n.id === openNodeModalId);
  }, [latestNodes, openNodeModalId]);

  const { updateNode } = useStore((state) => ({ updateNode: state.updateNode }), shallow);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if(!node ) {
      return;
    }
    onSelectedNode?.(node);
  }, [node]);

  useEffect(() => {
    if (!selectedNode) {
      setOpenNodeModalId(null);
    }
  }, [selectedNode]);

  // the useEffect is triggered only when the node configuration is saved
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
