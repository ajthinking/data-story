import React, { useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole
} from '@floating-ui/react';
import { Cell, Header } from '@tanstack/react-table';

export const FIXED_HEIGHT = 18;
export const FIXED_WIDTH = 75;
export const MIN_WIDTH = 25;
export const MAX_WIDTH = 150;

export const calculateColumnWidth = (cell: Header<Record<string, unknown>, unknown>|Cell<Record<string, unknown>, unknown>) => {
  // @ts-ignore
  const header = (cell.column.columnDef?.accessorKey ?? '') as unknown as string;
  if (header.length > 8) return MAX_WIDTH;
  return FIXED_WIDTH;
}

const formatCellContent = (content: unknown) => {
  let result = formatTooltipContent(content) as string;
  return result;
}
const formatTooltipContent = (content: unknown) => {
  try {
    JSON.parse(content as string);
    return JSON.stringify(JSON.parse(content as string), null, 2);
  } catch(e) {
    return content;
  }
}

export function TableCell(props: {tableRef: React.RefObject<HTMLTableElement>, content?: unknown}): JSX.Element {
  const { content = '', tableRef } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: showTooltip,
    onOpenChange: setShowTooltip,
    placement: 'bottom',
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'start'
      }),
      shift()
    ]
  });

  const click = useClick(context);
  const role = useRole(context, { role: 'tooltip' });
  const dismiss = useDismiss(context);
  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role,
    dismiss
  ]);

  const Tooltip = () => {
    return (
      <pre
        data-cy={'data-story-table-tooltip'}
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className="select-text overflow-visible z-50 bg-white shadow-lg rounded-md"
      >
        {formatTooltipContent(content) as string}
      </pre>
    );
  }

  return (
    <div className='w-full border-r border-gray-200'>
      <span
        className={'whitespace-nowrap overflow-hidden overflow-ellipsis inline-block w-full px-1'}
        ref={refs.setReference} {...getReferenceProps()}
      >
        {formatCellContent(content)}
      </span>
      <FloatingPortal root={tableRef}>
        {
          showTooltip && Tooltip()
        }
      </FloatingPortal>
    </div>
  );
}
