import { DataStoryNode } from '../Node/DataStoryNode';
export declare function useHotkeys({ nodes, openNodeModalId, setShowRunModal, setOpenNodeModalId, showConfigModal, showRunModal, showAddNodeModal, traverseNodes, setShowAddNodeModal, }: {
    nodes: DataStoryNode[];
    openNodeModalId: string | null;
    setShowRunModal: (show: boolean) => void;
    setOpenNodeModalId: (id: string | null) => void;
    showConfigModal: boolean;
    showRunModal: boolean;
    showAddNodeModal: boolean;
    traverseNodes: (direction: "up" | "down" | "left" | "right") => void;
    setShowAddNodeModal: (show: boolean) => void;
}): void;
