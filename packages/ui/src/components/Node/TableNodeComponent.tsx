import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  useFloating,
  useInteractions,
  useRole
} from '@floating-ui/react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
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

function TableNodeCell(props: {getTableRef: () => React.RefObject<HTMLTableElement>, content?: unknown}): JSX.Element {
  const { content = '', getTableRef } = props;
  console.log(content, 'content');
  const [showTooltip, setShowTooltip] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        showTooltip &&
        cellRef.current &&
        !cellRef.current?.contains(event.target as Node) &&
        !refs.floating.current?.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    }

    refs.floating.current?.addEventListener('mousedown', (event) => {
      event.stopPropagation();
    });

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [showTooltip]);

  const click = useClick(context);
  const role = useRole(context, { role: 'tooltip' });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role
  ]);
  const Tooltip = () => {
    return (
      <pre
        data-cy={'data-story-table-tooltip'}
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className="select-text overflow-visible z-50 bg-white shadow-lg p-2 rounded-md h-16"
      >
        {formatTooltipContent(content) as string}
      </pre>
    );
  }

  return (
    <div
      ref={cellRef}>
      <span
        ref={refs.setReference} {...getReferenceProps()}
      >
        {formatCellContent(content)}
      </span>
      <FloatingPortal root={getTableRef()}>
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
  return <div className="max-h-28 nowheel overflow-auto  rounded-sm relative">
    <div
      className="whitespace-nowrap bg-gray-200 text-left px-1 border-r-0.5 last:border-r-0 border-gray-300 sticky top-0 z-10">
      Awaiting data
    </div>
    <div className="text-center bg-gray-100 hover:bg-gray-200">
      Load initial data...
    </div>
  </div>;
}

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
  }, []);

  useDataStoryEvent(dataStoryEvent);

  let { headers, rows } = useMemo(() => {
    const itemCollection = new ItemCollection(items);
    return itemCollection.toTable();
  }, [items]);

  const getTableRef = () => {
    return tableRef;
  };

  const input = data.inputs[0];

  const columns: ColumnDef<Record<string, unknown>>[] = useMemo(
    () =>
      headers.map((header) => ({
        accessorKey: header,
        header: header,
      })),
    [headers]
  );

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
  console.log(tableData, 'tableData');

  const tableInstance = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  const { getHeaderGroups, getRowModel } = tableInstance;

  const parentRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 20, // 假设每行的高度为35px
    overscan: 5, // 预加载5行
    // 设置 total size 默认为 20px
  });

  console.log(rowVirtualizer, 'rowVirtualizer');
  console.log(getHeaderGroups(), 'getHeaderGroups()')
  return (
    (
      <div
        className="shadow-xl bg-gray-50 border rounded border-gray-300"
      >
        <HandleComponent input={input}/>
        <div className="text-gray-600 bg-gray-100 rounded font-mono text-xxxs">
          { isDataFetched ?
            (<div
              data-cy={'data-story-table'}
              ref={parentRef}
              className="max-h-28 h-28 nowheel overflow-auto scrollbar rounded-sm relative">
              <table ref={tableRef} className="table-auto rounded-sm grid">
                <thead className="grid sticky top-0 z-1">
                  {
                    getHeaderGroups().map((headerGroup) => (
                      <tr
                        key={headerGroup.id}
                        className="bg-gray-200 space-x-8 flex w-full"
                      >
                        {
                          headerGroup.headers.map((header) => (
                            <th
                              data-cy={'data-story-table-th'}
                              key={header.id}
                              style={{
                                width: header.getSize(),
                              }}
                              className="whitespace-nowrap bg-gray-200 text-left px-1 border-r-0.5 last:border-r-0 border-gray-300 sticky top-0 z-10 flex"
                            >
                              {
                                flexRender(
                                  <TableNodeCell getTableRef={getTableRef} content={header.column.columnDef.header}/>,
                                  header.getContext()
                                )
                              }
                            </th>
                          ))
                        }
                      </tr>
                    ))
                  }
                </thead>
                <tbody
                  style={{
                    display: 'grid',
                    height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
                    position: 'relative', //needed for absolute positioning of rows
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow, rowindex) => {
                    const row = getRowModel().rows[virtualRow.index];
                    console.log(row, 'row')
                    return (<tr
                      data-cy={'data-story-table-row'}
                      className="odd:bg-gray-50 absolute flex"
                      data-index={virtualRow.index} //needed for dynamic row height measurement
                      ref={node => rowVirtualizer.measureElement(node)} //measure dynamic row height
                      key={row.id}
                      style={{
                        transform: `translateY(${virtualRow.start}px)`,
                        width: '100%'
                      }}
                    >
                      {row.getVisibleCells().map((cell, cellIndex) => (<td
                        className="whitespace-nowrap px-1 flex"
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {
                          flexRender(
                            <TableNodeCell getTableRef={getTableRef} content={cell.getContext().getValue()}/>,
                            cell.getContext()
                          )
                        }
                      </td>))}
                    </tr>);
                  })}
                </tbody>
              </table>
              {
                (headers.length === 0 && rows.length === 0)
              && (<div data-cy={'data-story-table-no-data'} className="text-center text-gray-500 p-2">
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
