import React, { memo } from 'react';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { flexRender, RowModel } from '@tanstack/react-table';
import { calculateColumnWidth, FIXED_HEIGHT } from './TableCell';

export const MemoizedTableBody = memo(({
  virtualRows,
  getRowModel,
  virtualColumns,
  rowVirtualizer
}: {
  virtualRows: VirtualItem[];
  virtualColumns: VirtualItem[];
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  getRowModel: () => RowModel<Record<string, unknown>>
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
        // console.log(row.getVisibleCells(), 'row');
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
            {virtualColumns.map((virtualColumn) => {
              const cell = row.getVisibleCells()[virtualColumn.index];
              const columnWidth = calculateColumnWidth(cell);
              return (
                <td
                  key={cell.id}
                  className="max-w-[256px] whitespace-nowrap text-left border-r-0.5 last:border-r-0 border-gray-300"
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