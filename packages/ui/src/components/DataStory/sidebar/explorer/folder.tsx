import { Tree } from '@data-story/core';
import { NodeRendererProps } from 'react-arborist';
import { ChevronDown } from '../../icons/chevronDown';
import { ChevronRight } from '../../icons/chevronRight';
import { useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  VirtualElement,
} from '@floating-ui/react';

export function FolderNode({ node, style, dragHandle }: NodeRendererProps<Tree>) {
  const Icon = node.isOpen ? ChevronDown : ChevronRight;
  const isActualRoot = node.data.id === 'fake-project';
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({ mainAxis: 5, alignmentAxis: 4 }),
      flip({ fallbackPlacements: ['left-start'] }),
      shift({ padding: 10 }),
    ],
    placement: 'right-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
  });

  const role = useRole(context, { role: 'menu' });
  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([role, dismiss]);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    const x = event.clientX;
    const y = event.clientY;

    // Create a virtual element at the cursor position
    const virtualElement: VirtualElement = {
      getBoundingClientRect: () => new DOMRect(x, y, 0, 0),
      // contextElement: null,
    };

    refs.setPositionReference(virtualElement);
    setIsOpen(true);
  };

  return (
    <>
      <div
        className={`
          flex text-xs text-gray-900
          ${node.isSelected ? 'bg-gray-100 border-blue-500 border' : ''}
          ${isActualRoot ? 'font-bold uppercase' : ''}
        `}
        style={style}
        ref={dragHandle}
        onClick={() => node.toggle()}
        onContextMenu={handleContextMenu}
      >
        <div className="scale-0.5">
          <Icon />
        </div>
        <div className="ml-2">{node.data.name}</div>
      </div>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} initialFocus={refs.floating}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className="bg-red-500 text-white p-2"
              {...getFloatingProps()}
            >
              Hey! I'm a context menu!
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
