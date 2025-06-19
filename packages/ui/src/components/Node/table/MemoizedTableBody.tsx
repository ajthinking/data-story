import React, { memo } from 'react';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { flexRender, RowModel } from '@tanstack/react-table';
import { FIXED_HEIGHT } from './TableCell';
import { ColumnWidthOptions } from './CellsMatrix';

export const MemoizedTableBody = memo(({
  virtualRows,
  getRowModel,
  virtualColumns,
  rowVirtualizer,
  calculateColumnWidth,
}: {
  virtualRows: VirtualItem[];
  virtualColumns: VirtualItem[];
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  getRowModel: () => RowModel<Record<string, unknown>>;
  calculateColumnWidth: (colIndex: number,options?: ColumnWidthOptions) => number;
}) => {
  return (
    <tbody
      style={{
        display: 'grid',
        height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
        position: 'relative', //needed for absolute positioning of rows
      }}>
      {virtualRows.map((virtualRow, rowindex) => {
        const row = getRowModel().rows[virtualRow.index];
        return (
          <tr
            data-cy={'data-story-table-row'}
            className="odd:bg-gray-50 w-full text-xs"
            key={row.id}
            style={{
              display: 'flex',
              height: `${FIXED_HEIGHT}px`,
              position: 'absolute',
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {/**fake empty column to the left for virtualization scroll padding **/}
            <td
              style={{
                display: 'var(--virtual-padding-left-display)',
                width: 'calc(var(--virtual-padding-left) * 1px)',
              }}
            />
            {virtualColumns.map((virtualColumn, index) => {
              const cell = row.getVisibleCells()[virtualColumn.index];
              const columnWidth = calculateColumnWidth(index);
              const isLastColumn = index === virtualColumns.length - 1;

              return (
                <td
                  key={cell.id}
                  className={`max-w-[256px] whitespace-nowrap text-left border-gray-300
                  ${isLastColumn ? 'border-r-0' : 'border-r-0.5'}`}
                  style={{
                    display: 'flex',
                    position: 'relative',
                    width: `${columnWidth}px`,
                    height: `${FIXED_HEIGHT}px`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              )
            })}
            <td
              style={{
                display: 'var(--virtual-padding-right-display)',
                width: 'calc(var(--virtual-padding-right) * 1px)',
              }}
            />
          </tr>
        );
      })}
    </tbody>
  );
});