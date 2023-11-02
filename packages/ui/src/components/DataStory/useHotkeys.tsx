import { useEffect } from 'react';
import { DataStoryNode } from '../Node/DataStoryNode';

export function useHotkeys({
  nodes, 
  openNodeModalId, 
  setShowRunModal,
  setOpenNodeModalId, 
  showConfigModal, 
  showRunModal, 
  showAddNodeModal,
  traverseNodes,
  setShowAddNodeModal,
}: {
  nodes: DataStoryNode[],
  openNodeModalId: string | null,
  setShowRunModal: (show: boolean) => void,
  setOpenNodeModalId: (id: string | null) => void,
  showConfigModal: boolean,
  showRunModal: boolean,
  showAddNodeModal: boolean,
  traverseNodes: (direction: 'up' | 'down' | 'left' | 'right') => void,
  setShowAddNodeModal: (show: boolean) => void,

}) {
  useEffect(() => {
    // restore enterkey event listener
    // (it is disabled when the addNodeModal is open)
    if(!showAddNodeModal) {
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
      if ([
        openNodeModalId,
        showConfigModal,
        showRunModal,
        showAddNodeModal,
      ].find(Boolean)) return;
  
      // Open modal!
      if (shiftR) setShowRunModal(true);
      if (shiftPlus) {
        // When opening the add node modal, we want to disable the enter key      
        window.removeEventListener('keydown', handleEnterPress);
        setShowAddNodeModal(true);
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
        openNodeModalId,
        showConfigModal,
        showRunModal,
        showAddNodeModal,
      ].find(Boolean)) return;
  
      // Open node settings modal
      const openable = (() => {
        const selectedNodes = nodes.filter((node) => node.selected);
        const one = selectedNodes.length === 1;
        if(!one) return null;
  
        return selectedNodes.at(0);
      })()
      
      if (enter && openable && !showAddNodeModal) setOpenNodeModalId(openable.id);
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
    openNodeModalId,
    setOpenNodeModalId,
    showConfigModal,
    showRunModal,
    showAddNodeModal,
    traverseNodes,
  ]);
}