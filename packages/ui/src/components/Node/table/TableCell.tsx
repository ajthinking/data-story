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
  useRole,
} from '@floating-ui/react';

export const FIXED_HEIGHT = 24;
const TOOLTIPT_MAX_HEIGHT = FIXED_HEIGHT * 11;

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

export function TableCell(props: { tableRef: React.RefObject<HTMLTableElement | null>, content?: unknown }) {
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
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
    ],
  });

  const click = useClick(context);
  const role = useRole(context, { role: 'tooltip' });
  const dismiss = useDismiss(context);
  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role,
    dismiss,
  ]);
  console.log(floatingStyles, 'floatingStyles');

  const Tooltip = () => {
    return (
      <pre
        data-cy={'data-story-table-tooltip'}
        ref={refs.setFloating}
        style={{
          ...floatingStyles,
          maxHeight: `${TOOLTIPT_MAX_HEIGHT}px`,
        }}
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
