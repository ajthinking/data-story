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
export const MIN_WIDTH = 40;
export const MAX_WIDTH = 300;

export interface ColumnWidthInfo {
  minContent: number;
  maxContent: number;
  averageContent: number;
  isNumeric: boolean;
}

export const calculateColumnWidth = (cell: Header<Record<string, unknown>, unknown>|Cell<Record<string, unknown>, unknown>) => {
  // Get the header name
  // @ts-ignore
  const header = cell.column?.columnDef?.accessorKey as string || '';

  // Safely get width info
  const columnDef = cell.column?.columnDef as any;
  const widthInfo = columnDef?.widthInfo as ColumnWidthInfo | undefined;

  if (!widthInfo) {
    // Fallback to header-based width if no width info
    return Math.min(Math.max(header.length * 8, MIN_WIDTH), MAX_WIDTH);
  }

  if (widthInfo.isNumeric) {
    // For numeric columns, use a more compact width
    return Math.min(Math.max(widthInfo.maxContent * 8, MIN_WIDTH), 100);
  }

  // For text columns, use a weighted average of header and content width
  const headerWidth = header.length * 8;
  const contentWidth = Math.min(widthInfo.averageContent * 8, MAX_WIDTH);
  const width = Math.max(headerWidth, contentWidth);

  return Math.min(Math.max(width, MIN_WIDTH), MAX_WIDTH);
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
