import { Param, RepeatableParam } from '@data-story/core';
import React, { useState } from 'react';
import { Controller, ControllerRenderProps, UseFormRegister, UseFormReturn } from 'react-hook-form';
import { StringableInput } from './StringableInput';
import { PortSelectionInput } from '../modals/nodeSettingsModal/tabs/Params/PortSelectionInput';
import { StringableWithConfig } from '../modals/nodeSettingsModal/tabs/Params';
import { ReactFlowNode } from '../../Node/ReactFlowNode';
import { DragIcon } from '../icons/dragIcon';
import { CloseIcon } from '../icons/closeIcon';
import { DndProvider, useDrop } from 'react-dnd';
import { Row } from '@tanstack/react-table';
import { HTML5Backend } from 'react-dnd-html5-backend';

function RepeatableCell({
  column,
  form,
  name,
  rowIndex,
  node,
}: {
  column: Param,
  form: UseFormReturn<{[p: string]: any}, any>,
  name: any,
  columnIndex: number,
  rowIndex: number,
  node: ReactFlowNode,
}) {

  const paramCol = column

  return <td
    scope="row"
    className="border font-medium whitespace-nowrap bg-gray-50 align-top"
  >
    {paramCol.type === 'StringableParam' && <StringableWithConfig
      form={form}
      param={paramCol}
      {...paramCol}
      name={`params.${name}.${rowIndex}.${paramCol.name}`}
      node={node}
    />}
    {paramCol.type === 'PortSelectionParam' && <PortSelectionInput
      form={form}
      param={paramCol}
      {...paramCol}
      name={`params.${name}.${rowIndex}.${paramCol.name}`}
      node={node}
    />}
  </td>;
}

function RepeatableDraggableRow(props: RepeatableInputProps & {
  rowIndex: number,
  row: any,
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
}) {
  const { form, param,  node, row, rowIndex, reorderRow } = props;
  const name = param.name;
  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<unknown>) => reorderRow(draggedRow.index, rowIndex),
  });
  console.log(row, 'row');
  console.log(param.row, 'param.row');
  const paramRow = param.row;

  return <tr className="bg-white border-b dark:border-gray-700">
    <td
      ref={dropRef}
      className="border font-medium whitespace-nowrap bg-gray-50 align-top"
    >
      <button className="p-2">
        <DragIcon/>
      </button>
    </td>
    {
      param.row.map((column: Param, columnIndex: number) => (<RepeatableCell key={`${paramRow[columnIndex].name}-${columnIndex}`}
        column={column} form={form} name={name} rowIndex={rowIndex}
        columnIndex={columnIndex} node={node} />))
    }
    <td className="border font-medium whitespace-nowrap bg-gray-50 align-top">
      <button
        className="p-2"
        // onClick={handleDeleteRow}
      >
        <CloseIcon/>
      </button>
    </td>
  </tr>;
}

interface RepeatableInputProps {
  form: UseFormReturn<{
    [x: string]: any;
  }, any>;
  param: RepeatableParam<Param[]>;
  node: ReactFlowNode;

}

export function RepeatableControl({
  form,
  param,
  node,
  field
}: RepeatableInputProps & {
  field:  ControllerRenderProps<any, 'params'>;
}) {
  const defaultRows = () => {
    return [param.row]
  }

  const defaultRowData = (row: Param[]): unknown => {
    return Object.fromEntries( row.map((column: Param) => {
      return [column.name, column.value]
    }));
  }

  const getDefaultData = () => {
    const inheritedData = field.value?.[param.name] as unknown as Array<unknown>;
    // if inheritedData is not an array or array is empty, return default rows
    if (!Array.isArray(inheritedData) || !inheritedData.length) {
      return [defaultRowData(param.row)];
    }
    return inheritedData;
  }

  const [localRows, setLocalRows] = useState<any[]>(defaultRows());
  const [data, setData] = React.useState(getDefaultData());

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    localRows.splice(
      targetRowIndex,
      0,
      localRows.splice(draggedRowIndex, 1)[0]
    );
    setLocalRows([...localRows]);

    // props.filed.onChange(JSON.stringify(localRows));
    console.log('localRows AFTER', localRows);
  };
  console.log('localRows', localRows);

  const addRow = () => {
    console.log('Adding row!')

    const newData = [
      ...data,
      defaultRowData(param.row)
    ];
    const newFieldValue = field.value;
    newFieldValue[param.name] = newData;

    setData(newData);
    field.onChange(newFieldValue);
    // setLocalRows([
    //   ...(localRows),
    //   param.row
    // ])
  }

  return (
    <div className="flex flex-col text-xs w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-gray-50 text-gray-400">
          <tr>
            <th className='px-6 py-3 border'/>
            {param.row.map((column: any) => {
              return <th
                key={column.name}
                scope="col"
                className="px-6 py-3 border"
              >{column.label}</th>
            })}
            <th className='px-6 py-3 border'/>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            return (<RepeatableDraggableRow key={i} reorderRow={reorderRow} row={row} rowIndex={i}  param={param} form={form} node={node} />
            )
          })}
        </tbody>
      </table>

      <div className="flex bg-gray-50 w-full">
        <button
          className="border w-full p-2 text-xs uppercase border-rounded text-gray-400"
          onClick={addRow}>Add row</button>
      </div>
    </div>
  );
}

export const RepeatableInput = (props: RepeatableInputProps) => {
  console.log(props, 'props');
  return (
    <DndProvider backend={HTML5Backend}>
      <Controller
        render={({ field, fieldState, formState}) =>
          (<RepeatableControl field={field} {...props} />)}
        name={'params'}
        control={props.form.control}
      />
    </DndProvider>
  )
}
