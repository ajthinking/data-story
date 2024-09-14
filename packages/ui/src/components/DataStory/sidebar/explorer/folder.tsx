import { Tree } from '@data-story/core';
import { NodeRendererProps } from 'react-arborist';
import { ChevronDown } from '../../icons/chevronDown';
import { ChevronRight } from '../../icons/chevronRight';
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole
} from '@floating-ui/react';

type Option = {
  label: string;
  value: string;
  onClick: () => void;
};

const FolderDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([click, dismiss, role]);

  return (
    <div className="relative">
      (
      <FloatingPortal>
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={floatingStyles}
          className="z-50 bg-white rounded-md shadow-lg border w-44"
        >
            My dropdown 💕
        </div>
      </FloatingPortal>
      )
    </div>
  );
};

export function FolderNode({ node, style, dragHandle }: NodeRendererProps<Tree>) {
  const Icon = node.isOpen ? ChevronDown : ChevronRight;
  const isActualRoot = node.data.id === 'fake-project';
  const [isOpen, setIsOpen] = useState(false);
  const allowMouseUpCloseRef = useRef(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({ mainAxis: 5, alignmentAxis: 4 }),
      flip({
        fallbackPlacements: ['left-start']
      }),
      shift({ padding: 10 })
    ],
    placement: 'right-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate
  });

  const role = useRole(context, { role: 'menu' });
  const dismiss = useDismiss(context);

  const { getFloatingProps, getItemProps } = useInteractions([
    role,
    dismiss,
  ]);

  useEffect(() => {
    let timeout: number;

    function onContextMenu(e: MouseEvent) {
      e.preventDefault();

      refs.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: e.clientX,
            y: e.clientY,
            top: e.clientY,
            right: e.clientX,
            bottom: e.clientY,
            left: e.clientX
          };
        }
      });

      setIsOpen(true);
      clearTimeout(timeout);

      allowMouseUpCloseRef.current = false;
      timeout = window.setTimeout(() => {
        allowMouseUpCloseRef.current = true;
      }, 300);
    }

    function onMouseUp() {
      if (allowMouseUpCloseRef.current) {
        setIsOpen(false);
      }
    }

    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('mouseup', onMouseUp);
      clearTimeout(timeout);
    };
  }, [refs]);

  return (
    <div
      className={`
        flex text-xs text-gray-900
        ${node.isSelected ? 'bg-gray-100 border-blue-500 border' : ''}
        ${isActualRoot ? 'font-bold uppercase' : ''}
      `}
      style={style}
      ref={dragHandle}
      onClick={() => node.toggle()}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
    >
      <div className="scale-0.5">
        <Icon/>
      </div>
      <div className="ml-2">{node.data.name}</div>
      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay lockScroll>
            <FloatingFocusManager context={context} initialFocus={refs.floating}>
              <div
                className="bg-red-500 text-white p-2"
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                Hey! I'm a context menu!
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </div>
  );
}