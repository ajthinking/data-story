import React, { FC, useEffect, useState } from 'react';
import { Cell, ColumnDef, flexRender, getCoreRowModel, Row, RowData, useReactTable } from '@tanstack/react-table';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DataStoryNode } from '../../../../Node/DataStoryNode';
import { Port } from '@data-story/core';
import { Controller, ControllerRenderProps, UseFormReturn } from 'react-hook-form';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export interface OutputSchemaProps {
  node: DataStoryNode;
  register: any;
  form :  UseFormReturn<any>;
}

/**
 * todo:
 * 1. edit cell - get
 * 2. add display json block - get
 * 3. use real data
 * 4. add styles
 * 5. delete next.js webpack config
 */


export const defaultColumns: ColumnDef<Port>[] = ['name', 'schema'].map((key) => ({
  accessorKey: key,
  id: key,
}));

const DraggableRow: FC<{
  row: Row<Port>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
}> = ({ row, reorderRow }) => {
  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<Port>) => reorderRow(draggedRow.index, row.index),
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
    setExpanded(!expanded);
  }

  return (
    <>
      <tr
        ref={previewRef} //previewRef could go here
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <td ref={dropRef} className='w-28 text-center'>
          <button className='px-2' ref={dragRef}>🟰</button>
          <button onClick={handleExpandCollapse}>
            {expanded ? '🔽' : '▶️'}
          </button>
        </td>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {
              flexRender(cell.column.columnDef.cell, cell.getContext())
            }
          </td>
        ))}
        {/*// add delete and add buttons*/}
        <td className='w-28 text-center'>
          <button className='px-2'>➕</button>
          <button >✖️</button>
        </td>
      </tr>
      {expanded &&
        <tr>
          {/*// @ts-ignore*/}
          <td colSpan="4">
            <pre className="bg-gray-100 text-gray-800 text-sm font-mono p-4 border border-gray-300 rounded-md overflow-auto">
              {JSON.stringify(row.original, null, 2)}
            </pre>
          </td>
        </tr>
      }

    </>
  );
};

function PortEditCell({ initialValue, onBlur }: {initialValue: unknown, onBlur: (value: unknown) => void}){
  const [value, setValue] = useState(initialValue);
  console.log(value, 'value');

  return (
    <input
      className='text-center w-full'
      value={value as string}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      onBlur={() => onBlur(value)}
    />
  );
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Port>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = (value: unknown) => {
      table.options.meta?.updateData(index, id, value);
    };

    return (
      <PortEditCell initialValue={initialValue} onBlur={onBlur}/>
    );
  },
};
export function OutputTable(props: {
  filed:  ControllerRenderProps<any, 'outputs'>;
  outputs?: Port[];
}) {
  console.log(props.filed, 'props.onChange');
  const [columns] = React.useState(() => [...defaultColumns]);
  const [data, setData] = React.useState(formatOutputs(props.filed.value));

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(
      targetRowIndex,
      0,
      data.splice(draggedRowIndex, 1)[0] as Port
    );
    setData([...data]);

    props.filed.onChange(JSON.stringify(data));
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id, //good to have guaranteed unique row ids/keys for rendering
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        const updatedData = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...row,
              [columnId]: value,
            };
          }
          return row;
        });

        setData(updatedData);
        props.filed.onChange(JSON.stringify(updatedData));
      },
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="p-2">
      <table >
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


const formatOutputs = (outputs: string | object): Port[] => {
  return typeof outputs === 'string' ? JSON.parse(outputs) : outputs;
}

export const DataStoryOutputTable = (props: OutputSchemaProps) => {

  return (
    <DndProvider backend={HTML5Backend}>
      <Controller
        control={props.form.control}
        name="outputs"
        render={({ field }) => (
          <OutputTable filed={field} />
        )}
      />

    </DndProvider>
  );
}

