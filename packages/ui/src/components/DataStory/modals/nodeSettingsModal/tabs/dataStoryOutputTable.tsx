import React, { FC, useEffect, useState } from 'react';
import { Cell, ColumnDef, flexRender, getCoreRowModel, Row, RowData, useReactTable } from '@tanstack/react-table';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DataStoryNode } from '../../../../Node/DataStoryNode';
import { Port } from '@data-story/core';
import exports from 'webpack';
import register = exports.util.serialization.register;
// import './index.css';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export interface OutputSchemaProps {
  node: DataStoryNode;
  register: any;
}

/**
 * todo:
 * 1. edit cell - get
 * 2. add display json block - get
 * 3. use real data
 * 4. add styles
 * 5. delete next.js webpack config
 */


export const defaultColumns: ColumnDef<Port>[] = ['id', 'name', 'schema'].map((key) => ({
  accessorKey: key,
  id: key,
}));

console.log(defaultColumns, 'defaultColumns');

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
    console.log('expand/collapse');
    setExpanded(!expanded);
  }

  function getTdText(cell: Cell<Port, unknown>): React.ReactNode | JSX.Element {
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  }

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
            {
              getTdText(cell)
            }
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
const defaultColumn: Partial<ColumnDef<Port>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        value={value as string}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onBlur={onBlur}
      />
    );
  },
};
export function OutputTable(props: {
  register: any;
  outputs: Port[];
}) {
  const [columns] = React.useState(() => [...defaultColumns]);
  const [data, setData] = React.useState(props.outputs);

  console.log(props.outputs, 'props.node', props.register, 'props.register', data, 'data');

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(
      targetRowIndex,
      0,
      data.splice(draggedRowIndex, 1)[0] as Port
    );
    setData([...data]);
    props.register('outputs', { value: data });
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
        props.register('outputs', { value: updatedData });
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


export const DataStoryOutputTable = (props: OutputSchemaProps) => {

  const newOutputs = props.node.data.outputs.map((output: Port) => {
    return {
      ...output,
      schema: JSON.stringify(output.schema, null, 2)
    }
  }) as unknown as Port[];

  return (
    <DndProvider backend={HTML5Backend}>
      <OutputTable register={props.register} outputs={newOutputs} />
    </DndProvider>
  );
}

