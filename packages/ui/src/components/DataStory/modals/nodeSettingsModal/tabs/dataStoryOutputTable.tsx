import React, { FC, useEffect, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, Row, RowData, useReactTable } from '@tanstack/react-table';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { makeData, makeDataKeys, Person } from './makeData';
// import './index.css';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}
/**
 * todo:
 * 1. edit cell
 * 2. add display json block
 * 3. use real data
 */


export const defaultColumns: ColumnDef<Person>[] = makeDataKeys.map((key) => ({
  accessorKey: key,
  id: key,
}));

console.log(defaultColumns, 'defaultColumns');

const DraggableRow: FC<{
  row: Row<Person>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
}> = ({ row, reorderRow }) => {
  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<Person>) => reorderRow(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });
  const [expanded, setExpanded] = useState(false);
  const handleExpandCollapse = () => {
    console.log('expand/collapse');
    setExpanded(!expanded);
  }
  console.log(row, 'row')

  return (
    <>
      <tr
        ref={previewRef} //previewRef could go here
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <td ref={dropRef}>
          <button ref={dragRef}>🟰</button>
          <button onClick={handleExpandCollapse}>
            {expanded ? '🔽' : '🔼'}
          </button>
        </td>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
      {expanded &&
        <tr>
          {/*// @ts-ignore*/}
          <td colSpan="3">
            <pre>
              {JSON.stringify(row.original, null, 2)}
            </pre>
          </td>
        </tr>

      }
    </>
  )
  ;
};

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Person>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(initialValue);
    // console.log('init defaultColumn', value, initialValue, getValue(), index, id, table.options.meta?.updateData, table.options.meta?.updateData?.toString());

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

export function OutputTable() {
  const [columns] = React.useState(() => [...defaultColumns]);
  const [data, setData] = React.useState(() => makeData(20));

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(
      targetRowIndex,
      0,
      data.splice(draggedRowIndex, 1)[0] as Person
    );
    setData([...data]);
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.userId, //good to have guaranteed unique row ids/keys for rendering
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th/>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <DraggableRow key={row.id} row={row} reorderRow={reorderRow}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export const DataStoryOutputTable = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <OutputTable/>
    </DndProvider>
  );
}

