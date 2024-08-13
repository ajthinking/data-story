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

}) {
  useEffect(() => {
    // restore enterkey event listener
    // (it is disabled when the addNodeModal is open)
    if(!showAddNode) {
      window.addEventListener('keydown', handleEnterPress);
    }

    function handleKeyPress(event: KeyboardEvent) {
      // Swedish Mac keyboard 🤷‍♂️
      const shiftR = event.shiftKey && event.code === 'KeyR';
      const shiftPlus = event.shiftKey && event.code === 'Minus'

      const arrowUp = event.code === 'ArrowUp';
      const arrowDown = event.code === 'ArrowDown';
      const arrowLeft = event.code === 'ArrowLeft';
      const arrowRight = event.code === 'ArrowRight';

      const enter = event.code === 'Enter';

      // Ensure no modal is already open
      // if ([
      //   openNodeModalId,
      //   showConfigModal,
      //   showRunModal,
      //   showAddNodeModal,
      // ].find(Boolean)) return;

      // Open modal!
      if (shiftR) setShowRun(true);
      if (shiftPlus) {
        // When opening the add node modal, we want to disable the enter key
        window.removeEventListener('keydown', handleEnterPress);
        setShowAddNode(true);
      }

      // Open node settings modal
      const openable = (() => {
        const selectedNodes = nodes.filter((node) => node.selected);
        const one = selectedNodes.length === 1;
        if(!one) return null;

        return selectedNodes.at(0);
      })()

      // Select nodes
      if (arrowUp) traverseNodes('up');
      if (arrowDown) traverseNodes('down');
      if (arrowLeft) traverseNodes('left');
      if (arrowRight) traverseNodes('right');
    }

    function handleEnterPress(event: KeyboardEvent) {
      // Swedish Mac keyboard 🤷‍♂️

      const enter = event.code === 'Enter';

      // Ensure no modal is already open
      if ([
        // openNodeModalId,
        // showConfigModal,
        showRun,
        showAddNode,
      ].find(Boolean)) return;

      // Open node settings modal
      const openable = (() => {
        const selectedNodes = nodes.filter((node) => node.selected);
        const one = selectedNodes.length === 1;
        if(!one) return null;

        return selectedNodes.at(0);
      })()

      if (enter && openable) setOpenNodeSidebarId(openable.id);
    }

    // Add the event listener when the component mounts
    window.addEventListener('keyup', handleKeyPress);
    window.addEventListener('keydown', handleEnterPress);

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
