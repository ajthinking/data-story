import { useEffect } from 'react';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { Direction } from './getNodesWithNewSelection';

export class HotkeyManager {
  private hotkeys: {};
  constructor() {
    this.hotkeys = {};
  }

  addEvent() {
    window?.addEventListener?.('keydown', this.handleKeyDown.bind(this));
  }

  removeEvent() {
    window?.removeEventListener?.('keydown', this.handleKeyDown.bind(this));
  }

  register(key: string, callback: (event: KeyboardEvent) => any) {
    this.hotkeys[key] = callback;
  }

  unregister(key: string) {
    delete this.hotkeys[key];
  }

  handleKeyDown(event: KeyboardEvent) {
    const isCtrlOrCmd = event.ctrlKey || event.metaKey;
    const keyCombination = `${event.shiftKey ? 'Shift+' : ''}${isCtrlOrCmd ? (event.ctrlKey ? 'Ctrl+' : 'Cmd+') : ''}${event.code}`;    if (this.hotkeys[keyCombination]) {
      console.log('keyCombination', keyCombination);
      event.stopPropagation();
      event.preventDefault();
      this.hotkeys[keyCombination](event);
    }
  }
}
const hotkeyManager = new HotkeyManager();

export function useHotkeys({
  nodes,
  setShowRun,
  setOpenNodeSidebarId,
  showRun,
  showAddNode,
  traverseNodes,
  setShowAddNode,
  // hotkeyManager,
  onSave,
}: {
  nodes: ReactFlowNode[],
  setShowRun: (show: boolean) => void,
  setOpenNodeSidebarId: (id: string | null) => void,
  showRun: boolean,
  showAddNode: boolean,
  traverseNodes: (direction: Direction) => void,
  setShowAddNode: (show: boolean) => void,
  // hotkeyManager: HotkeyManager,
  onSave?: () => void,
}) {
  useEffect(() => {
    hotkeyManager.addEvent();
    return () => {
      hotkeyManager.removeEvent();
    }
  }, []);

  useEffect(() => {
    const actionMap = {
      'Shift+KeyR': () => !showRun && setShowRun(true),
      'Shift+Minus': () => {
        !showAddNode && setShowAddNode(true);
      },
      'ArrowUp': () => traverseNodes('up'),
      'ArrowDown': () => traverseNodes('down'),
      'ArrowLeft': () => traverseNodes('left'),
      'ArrowRight': () => traverseNodes('right'),
      'Ctrl+KeyS': () => onSave?.(),
      'Cmd+KeyS': () => onSave?.(),
    };

    for(let actionMapKey in actionMap) {
      hotkeyManager.register(actionMapKey, actionMap[actionMapKey]);
    }
  }, [onSave, setShowAddNode, setShowRun, showAddNode, showRun, traverseNodes]);

  useEffect(() => {
    function handleEnterPress() {
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

      if (openable) setOpenNodeSidebarId(openable.id);
    }

    hotkeyManager.register('Enter', handleEnterPress);
  }, [nodes, setOpenNodeSidebarId, showAddNode, showRun]);
}
