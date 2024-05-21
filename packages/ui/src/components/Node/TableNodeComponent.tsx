import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { DataStoryNodeData } from './ReactFlowNode';
import { Handle, Position } from 'reactflow';
import { ItemCollection } from './ItemCollection';
import { DataStoryEvents, DataStoryEventType } from '../DataStory/events/dataStoryEventType';
import { useDataStoryEvent } from '../DataStory/events/eventManager';
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
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { notUndefined, useVirtualizer } from '@tanstack/react-virtual';
import { useObserverTable } from './UseObserverTable';
import { Port } from '@data-story/core';

const TRUNCATE_CELL_LENGTH = 50;

const formatCellContent = (content: unknown) => {
  let result = formatTooltipContent(content) as string;
  return result.length > TRUNCATE_CELL_LENGTH ? result.slice(0, TRUNCATE_CELL_LENGTH) + '...' : result;
}

const formatTooltipContent = (content: unknown) => {
  try {
    JSON.parse(content as string);
    return JSON.stringify(JSON.parse(content as string), null, 2);
  } catch(e) {
    return content;
  }
}

function TableNodeCell(props: {tableRef: React.RefObject<HTMLTableElement>, content?: unknown}): JSX.Element {
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

function HandleComponent(props: {input: Port}) {
  return <div className="absolute z-30">
    <div className="absolute">

    </div>
    <div>
      <Handle
        className="relative"
        type="target"
        position={Position.Left}
        style={{
          opacity: 0,
          backgroundColor: 'red',
          position: 'relative',
          height: 1,
          width: 1,
          top: 0,
          right: 0
        }}
        id={props.input.id}
        isConnectable={true}
      />
    </div>
  </div>;
}

function LoadingComponent() {
  return <div data-cy={'data-story-table-await-data'} className="max-h-28 nowheel overflow-auto  rounded-sm relative">
    <div
      className="whitespace-nowrap bg-gray-200 text-left px-1 border-r-0.5 last:border-r-0 border-gray-300 sticky top-0 z-10">
      Awaiting data
    </div>
    <div className="text-center bg-gray-100 hover:bg-gray-200">
      Load initial data...
    </div>
  </div>;
}

const fixedHeight = 12;

const TableNodeComponent = ({ id, data }: {
  id: string,
  data: DataStoryNodeData,
  selected: boolean
}) => {
  const [items, setItems] = useState([]);
  const tableRef = useRef<HTMLTableElement>(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useObserverTable({ id, isDataFetched, setIsDataFetched, setItems });

  const dataStoryEvent = useCallback((event: DataStoryEventType) => {
    if (event.type === DataStoryEvents.RUN_START) {
      setItems([]);
      setIsDataFetched(false);
    }
    if (event.type === DataStoryEvents.RUN_SUCCESS) {
      setIsDataFetched(true);
    }
  }, []);

  useDataStoryEvent(dataStoryEvent);

  let { headers, rows } = useMemo(() => {
    const itemCollection = new ItemCollection(items);
    return itemCollection.toTable();
  }, [items]);

  const input = data.inputs[0];

  const columns: ColumnDef<Record<string, unknown>>[] = useMemo(
    () =>
      headers.map((header) => ({
        accessorKey: header,
        id: header,
        header: () => <TableNodeCell tableRef={tableRef} content={header}/>,
        cell: ({ cell, row }) => {
          const originalContent = row.original[cell.column?.id];
          return <TableNodeCell tableRef={tableRef} content={originalContent}/>
        }
      })), [headers]);

  const tableData = useMemo(
    () =>
      rows.map((row) => {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        return rowData;
      }),
    [rows, headers]
  );

  const tableInstance = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { getHeaderGroups, getRowModel } = tableInstance;

  const parentRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  const virtualizer = useVirtualizer({
    count: getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => fixedHeight, // every row fixed height
    overscan: 2,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const [before, after] =
    virtualItems.length > 0
      ? [
        notUndefined(virtualItems[0]).start - virtualizer.options.scrollMargin,
        virtualizer.getTotalSize() - notUndefined(virtualItems[virtualItems.length - 1]).end,
      ]
      : [0, 0];

  const showNoData = useMemo(() => {
    return headers.length === 0 && rows.length === 0;
  }, [headers.length, rows.length]);

  return (
    (
      <div
        ref={tableRef}
        className="shadow-xl bg-gray-50 border rounded border-gray-300 text-xxxs"
      >
        <HandleComponent input={input}/>
        <div data-cy={'data-story-table'} className="text-gray-600 bg-gray-100 rounded font-mono">
          {isDataFetched ?
            (<div
              ref={parentRef}
              style={{
                height: showNoData ? '40px' : 'auto',
              }}
              data-cy={'data-story-table-scroll'}
              className="max-h-48 nowheel overflow-auto scrollbar rounded-sm">
              <table className="table-auto">
                <thead>
                  {
                    getHeaderGroups().map((headerGroup) => (
                      <tr
                        key={headerGroup.id}
                        className="bg-gray-200 space-x-4 z-10"
                      >
                        {
                          headerGroup.headers.map((header) => (
                            <th
                              data-cy={'data-story-table-th'}
                              key={header.id}
                              style={{
                                height: `${fixedHeight}px`,
                                width: 'auto',
                                minWidth: '25px',
                              }}
                              className="z-10  sticky top-0 whitespace-nowrap bg-gray-200 text-left px-1 border-r-0.5 last:border-r-0 border-gray-300"
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                          ))
                        }
                      </tr>
                    ))
                  }
                </thead>
                <tbody>
                  {before > 0 && (
                    <tr>
                      <td style={{ height: before }} />
                    </tr>
                  )}
                  {virtualizer.getVirtualItems().map((virtualRow, rowindex) => {
                    const row = getRowModel().rows[virtualRow.index];
                    return (<tr
                      data-cy={'data-story-table-row'}
                      className="odd:bg-gray-50 w-full text-xxxs"
                      key={row.id}
                      style={{
                        width: '100%',
                      }}
                    >
                      {row.getVisibleCells().map((cell, cellIndex) => (<td
                        className="whitespace-nowrap px-1 py-0 my-0"
                        key={cell.id}
                        style={{
                          width: 'auto',
                          minWidth: '25px',
                          height: `${fixedHeight}px`,
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>))}
                    </tr>);
                  })}
                  {after > 0 && (
                    <tr>
                      <td style={{ height: after }} />
                    </tr>
                  )}
                </tbody>
              </table>
              {
                showNoData && (<div data-cy={'data-story-table-no-data'} className="text-center text-gray-500 p-2">
                  No data
                </div>)
              }
            </div>)
            : <LoadingComponent/>
          }
        </div>
      </div>
    )
  )
  ;
};

export default memo(TableNodeComponent)
