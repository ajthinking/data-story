import { useEffect } from 'react';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { Direction } from './getNodesWithNewSelection';
import { DataStoryCanvasProps } from './types';
import { Diagram } from '@data-story/core';

export class HotkeyManager {
  private hotkeys: {};
  private element: React.RefObject<HTMLElement>;

  constructor(element: React.RefObject<HTMLElement>) {
    this.hotkeys = {};
    this.element = element;
  }

  addEvent() {
    this.element.current?.addEventListener?.('keydown', this.handleKeyDown.bind(this) as EventListener);
  }

  removeEvent() {
    this.element.current?.removeEventListener?.('keydown', this.handleKeyDown.bind(this) as EventListener);
  }

  register(key: string, callback: (event: KeyboardEvent) => any) {
    this.hotkeys[key] = callback;
  }

  unregister(key: string) {
    delete this.hotkeys[key];
  }

  handleKeyDown(event: KeyboardEvent) {
    const isCtrlOrCmd = event.ctrlKey || event.metaKey;
    const keyCombination = `${event.shiftKey ? 'Shift+' : ''}${isCtrlOrCmd ? (event.ctrlKey ? 'Ctrl+' : 'Cmd+') : ''}${event.code}`;
    if (this.hotkeys[keyCombination]) {
      event.stopPropagation();
      event.preventDefault();
      this.hotkeys[keyCombination](event);
    }
  }
}

export function useHotkeys({
  nodes,
  setShowRun,
  setSelectedNode,
  traverseNodes,
  setShowAddNode,
  hotkeyManager,
  onSave,
  toDiagram,
}: {
  nodes: ReactFlowNode[],
  setShowRun: (show: boolean) => void,
  traverseNodes: (direction: Direction) => void,
  setShowAddNode: (show: boolean) => void,
  hotkeyManager: HotkeyManager,
  setSelectedNode?: (node: ReactFlowNode) => void,
  onSave?: DataStoryCanvasProps['onSave'],
  toDiagram: () => Diagram
}) {
  useEffect(() => {
    hotkeyManager.addEvent();
    return () => {
      hotkeyManager.removeEvent();
    }
  }, []);

  useEffect(() => {
    hotkeyManager.register('Shift+Minus', () => {
      setShowAddNode(true);
    });
    return () => hotkeyManager.unregister('Shift+Minus');
  }, [hotkeyManager, setShowAddNode]);

  useEffect(() => {
    hotkeyManager.register('Shift+KeyR', () => setShowRun(true));
    return () => hotkeyManager.unregister('Shift+KeyR');
  }, [hotkeyManager, setShowRun]);

  useEffect(() => {
    hotkeyManager.register('Ctrl+KeyS', () => onSave?.(toDiagram?.()));
    hotkeyManager.register('Cmd+KeyS', () => onSave?.(toDiagram?.()));
    return () => {
      hotkeyManager.unregister('Ctrl+KeyS');
      hotkeyManager.unregister('Cmd+KeyS');
    }
  }, [hotkeyManager, onSave, toDiagram]);

  useEffect(() => {
    const actionMap = {
      // The operation below is not valid.
      'ArrowUp': () => traverseNodes('up'),
      'ArrowDown': () => traverseNodes('down'),
      'ArrowLeft': () => traverseNodes('left'),
      'ArrowRight': () => traverseNodes('right'),
    };

    for(let actionMapKey in actionMap) {
      hotkeyManager.register(actionMapKey, actionMap[actionMapKey]);
    }
    return () => {
      for(let actionMapKey in actionMap) {
        hotkeyManager.unregister(actionMapKey);
      }
    }
  }, [hotkeyManager, traverseNodes]);

  useEffect(() => {
    function handleEnterPress() {
      // Open node settings modal
      const openable = (() => {
        const selectedNodes = nodes.filter((node) => node.selected);
        const one = selectedNodes.length === 1;
        if (!one) return null;

        return selectedNodes.at(0);
      })()
      if (openable) {
        setSelectedNode?.(openable)
      }
    }

    hotkeyManager.register('Enter', handleEnterPress);

    return () => hotkeyManager.unregister('Enter');
  }, [nodes, setSelectedNode, hotkeyManager]);
}
