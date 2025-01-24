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

export const FIXED_HEIGHT = 28;
export const WIDTH = 75;
export const MIN_WIDTH = 40;
export const MAX_WIDTH = 256;

export interface ColumnWidthInfo {
  minContent: number;
  maxContent: number;
  averageContent: number;
  isNumeric: boolean;
}

export const calculateColumnWidth = (cell: Header<Record<string, unknown>, unknown> | Cell<Record<string, unknown>, unknown>) => {
  const columnDef = cell.column?.columnDef as any;
  const maxChars = columnDef?.maxChars as number;
  console.log('calculateColumnWidth todo maxChars', maxChars);

  if (!maxChars) {
    return WIDTH;
  }

  // Convert chars to pixels (8px per char)
  return Math.min(Math.max(maxChars * 8, MIN_WIDTH), MAX_WIDTH);
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
        className="select-text overflow-auto whitespace-pre-wrap break-words z-50 bg-white shadow-lg rounded-md "
      >
        {formatTooltipContent(content) as string}
      </pre>
    );
  }

  return (
    <div className='w-full'>
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
