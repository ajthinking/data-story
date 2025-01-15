import React, { memo, useCallback, useMemo, useRef, useState, CSSProperties, HTMLProps } from 'react';
import { DataStoryNodeData } from './ReactFlowNode';
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
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, HeaderGroup, useReactTable } from '@tanstack/react-table';
import { notUndefined, useVirtualizer, VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { useObserverTable } from './UseObserverTable';
import CustomHandle from './CustomHandle';
import { ItemValue } from '@data-story/core';
import { useWhyDidYouUpdate } from 'ahooks';

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
    <div style={{width: '75px'}}>
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

const fixedHeight = 18;

const MemoizedTableBody = memo(({
  before,
  after,
  virtualRows,
  getRowModel,
  virtualColumns,
  rowVirtualizer
}: {
  before: number;
  after: number;
  virtualRows: VirtualItem[];
  virtualColumns: VirtualItem[];
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  getRowModel: () => any;
}) => {
  useWhyDidYouUpdate('MemoizedTableBody', { before, after, virtualRows, getRowModel });
  return (
    <tbody
      style={{
        display: 'grid',
        height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
        position: 'relative', //needed for absolute positioning of rows
      }}>
      {virtualRows.map((virtualRow, rowindex) => {
        const row = getRowModel().rows[virtualRow.index];
        // console.log(row.getVisibleCells(), 'row');
        return (
          <tr
            data-cy={'data-story-table-row'}
            className="odd:bg-gray-50 w-full text-xs"
            key={row.id}
            style={{
              display: 'flex',
              width: '100%',
              height: `${fixedHeight}px`,
              position: 'absolute',
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {/**fake empty column to the left for virtualization scroll padding **/}
            {/*<td*/}
            {/*  style={{*/}
            {/*    display: 'var(--virtual-padding-left-display)',*/}
            {/*    width: 'calc(var(--virtual-padding-left) * 1px)',*/}
            {/*  }}*/}
            {/*/>*/}
            {virtualColumns.map((virtualColumn) => {
              const cell = row.getVisibleCells()[virtualColumn.index];
              return (
                <td
                  key={cell.id}
                  className="whitespace-nowrap text-left"
                  style={{
                    display: 'flex',
                    position: 'relative',
                    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                    height: `${fixedHeight}px`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              )
            })}
            {/*<td*/}
            {/*  style={{*/}
            {/*    display: 'var(--virtual-padding-right-display)',*/}
            {/*    width: 'calc(var(--virtual-padding-right) * 1px)',*/}
            {/*  }}*/}
            {/*/>*/}
          </tr>
        );
      })}
    </tbody>
  );
});

const MemoizedTableHeader = memo(({
  headerGroups,
  virtualColumns
}: {
  headerGroups: HeaderGroup<Record<string, unknown>>[];
  virtualColumns: VirtualItem[];
}) => {
  useWhyDidYouUpdate('MemoizedTableHeader', { headerGroups, virtualColumns });
  return (
    <thead
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        display: 'grid',
      }}>
      {headerGroups.map((headerGroup) => (
        <tr
          key={headerGroup.id}
          className="bg-gray-200 z-10 flex"
        >
          {/**fake empty column to the left for virtualization scroll padding **/}
          <th
            style={{
              display: 'var(--virtual-padding-left-display)',
              width: 'calc(var(--virtual-padding-left) * 1px)',
            }}
          />
          {
            virtualColumns.map((virtualColumn) => {
              const headerColumn = headerGroup.headers[virtualColumn.index];
              return (
                <th
                  data-cy={'data-story-table-th'}
                  key={headerColumn.id}
                  style={{
                    display: 'flex',
                    position: 'relative',
                    width: `calc(var(--header-${headerColumn?.id}-size) * 1px)`,
                  }}
                  className="whitespace-nowrap bg-gray-200 text-left border-r-0.5 last:border-r-0 border-gray-300"
                >
                  {flexRender(headerColumn.column.columnDef.header, headerColumn.getContext())}
                </th>
              );
            })
          }
        </tr>
      ))}
    </thead>
  );
});

const TableNodeComponent = ({ id, data }: {
  id: string,
  data: DataStoryNodeData,
  selected: boolean
}) => {
  const [items, setItems] = useState<ItemValue[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const parentRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  useWhyDidYouUpdate('TableNodeComponent', { id, data });

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

  useObserverTable({ id, setIsDataFetched, setItems, items, parentRef });

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
    defaultColumn: {
      size: 75,
      minSize: 25,
      maxSize: 150,
    },
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

  });

  const { getHeaderGroups, getRowModel } = tableInstance;
  const visibleColumns = tableInstance.getVisibleLeafColumns();
  /**
   * Instead of calling `column.getSize()` on every render for every header
   * and especially every data cell (very expensive),
   * we will calculate all column sizes at once at the root table level in a useMemo
   * and pass the column sizes down as CSS variables to the <table> element.
   */
  // todo: 这里存在问题
  const colSizes = React.useMemo(() => {
    const headers = tableInstance.getLeafHeaders();
    const colSizes: { [key: string]: number } = {};

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    console.log(colSizes, 'colSizes');
    return colSizes;
  }, [tableInstance.getState().columnSizingInfo, tableInstance.getLeafHeaders()]);
  const rowVirtualizer = useVirtualizer({
    count: getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => fixedHeight, // every row fixed height
    overscan: 2,
  });
  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(), //estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => parentRef.current,
    horizontal: true,
    overscan: 2, //how many columns to render on each side off screen each way (adjust this for performance)
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const virtualColumns = columnVirtualizer.getVirtualItems();
  //different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right

  let virtualPaddingVars = {
    '--virtual-padding-left': 0,
    '--virtual-padding-right': 0,
    '--virtual-padding-right-display': 'none',
    '--virtual-padding-left-display': 'none',
  };

  if (columnVirtualizer && virtualColumns?.length) {
    let virtualPaddingLeft: number | undefined;
    let virtualPaddingRight: number | undefined;

    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
    columnVirtualizer.getTotalSize() -
    (virtualColumns[virtualColumns.length - 1]?.end ?? 0);

    virtualPaddingVars = {
      '--virtual-padding-left': virtualPaddingLeft,
      '--virtual-padding-right': virtualPaddingRight,
      '--virtual-padding-right-display': virtualPaddingRight ? 'flex' : 'none',
      '--virtual-padding-left-display': virtualPaddingLeft ? 'flex' : 'none',
    };
  }

  const [before, after] =
    virtualRows.length > 0
      ? [
        notUndefined(virtualRows[0]).start - rowVirtualizer.options.scrollMargin,
        rowVirtualizer.getTotalSize() - notUndefined(virtualRows[virtualRows.length - 1]).end,
      ]
      : [0, 0];

  const showNoData = useMemo(() => {
    return headers.length === 0 && rows.length === 0;
  }, [headers.length, rows.length]);

  return (
    (
      <div
        ref={tableRef}
        className="shadow-xl bg-gray-50 border rounded border-gray-300 text-xs"
      >
        <CustomHandle id={input.id} isConnectable={true} isInput={true} />

        <div data-cy={'data-story-table'} className="text-gray-600 bg-gray-100 rounded font-mono -mt-3">
          {isDataFetched ?
            (<div
              ref={parentRef}
              style={{
                height: showNoData ? '40px' : '200px',
                position: 'relative', // needed for sticky header
                ...virtualPaddingVars,
                ...colSizes,
              }}
              data-cy={'data-story-table-scroll'}
              className="max-h-64 max-w-128 nowheel overflow-auto scrollbar rounded-sm">
              <table className="table-fixed grid">
                <MemoizedTableHeader
                  headerGroups={getHeaderGroups()}
                  virtualColumns={virtualColumns}
                />
                <MemoizedTableBody
                  before={before}
                  after={after}
                  virtualRows={virtualRows}
                  virtualColumns={virtualColumns}
                  rowVirtualizer={rowVirtualizer}
                  getRowModel={getRowModel}
                />
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
