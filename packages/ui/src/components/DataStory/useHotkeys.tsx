import { useEffect } from 'react';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { Direction } from './getNodesWithNewSelection';

export function useHotkeys({
  nodes,
  openNodeSidebarId,
  setShowRun,
  setOpenNodeSidebarId,
  showConfigModal,
  showRun,
  showAddNode,
  traverseNodes,
  setShowAddNode,
  onSave,
}: {
  nodes: ReactFlowNode[],
  openNodeSidebarId: string | null,
  setShowRun: (show: boolean) => void,
  setOpenNodeSidebarId: (id: string | null) => void,
  showConfigModal: boolean,
  showRun: boolean,
  showAddNode: boolean,
  traverseNodes: (direction: Direction) => void,
  setShowAddNode: (show: boolean) => void,
  onSave?: () => void,
}) {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      // Swedish Mac keyboard 🤷‍♂️
      const actionMap = {
        'Shift+KeyR': () => !showRun && setShowRun(true),
        'Shift+Minus': () => {
          console.log('shift minus');
          // window.removeEventListener('keydown', handleEnterPress); // 注意这里需要保证handleEnterPress的正确引用
          !showAddNode && setShowAddNode(true);
        },
        'ArrowUp': () => traverseNodes('up'),
        'ArrowDown': () => traverseNodes('down'),
        'ArrowLeft': () => traverseNodes('left'),
        'ArrowRight': () => traverseNodes('right'),
        'Ctrl+KeyS': () => onSave?.(),
        'Cmd+KeyS': () => onSave?.(),
      };

      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      const keyCombination = `${event.shiftKey ? 'Shift+' : ''}${isCtrlOrCmd ? (event.ctrlKey ? 'Ctrl+' : 'Cmd+') : ''}${event.code}`;
      console.log(keyCombination, 'key combination');
      const action = actionMap[keyCombination];
      if (action) {
        event.preventDefault();
        event.stopPropagation();
        console.log('action222', action);
        action();
      }
    }

    function handleEnterPress(event: KeyboardEvent) {
      // Swedish Mac keyboard 🤷‍♂️

      const enter = event.code === 'Enter';

      // Ensure no modal is already open
      if ([
        showRun,
        showAddNode,
      ].find(Boolean)) return;

      // Open node settings modal
      const openable = (() => {
        const selectedNodes = nodes.filter((node) => node.selected);
        const one = selectedNodes.length === 1;
        if (!one) return null;

        return selectedNodes.at(0);
      })()

      if (enter && openable) setOpenNodeSidebarId(openable.id);
    }

    // (it is disabled when the addNodeModal is open)
    if (!showAddNode) {
      window.addEventListener('keydown', handleEnterPress);
      window.addEventListener('keyup', handleKeyPress);
    } else {
      window.addEventListener('keyup', handleKeyPress);
    }

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
      window.removeEventListener('keydown', handleEnterPress);
    };
  }, [
    nodes,
    openNodeSidebarId,
    setOpenNodeSidebarId,
    showConfigModal,
    showRun,
    showAddNode,
    traverseNodes,
  ]);
}
