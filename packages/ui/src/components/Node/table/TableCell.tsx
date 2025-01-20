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

const TRUNCATE_CELL_LENGTH = 8;

const formatCellContent = (content: unknown) => {
  let result = formatTooltipContent(content) as string;
  return result.length > TRUNCATE_CELL_LENGTH ? result.slice(0, TRUNCATE_CELL_LENGTH) + '..' : result;
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
    <div>
      <span
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