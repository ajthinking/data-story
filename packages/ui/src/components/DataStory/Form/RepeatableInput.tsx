import { Param, RepeatableParam } from '@data-story/core';
import { useState } from 'react';
import { UseFormRegister, UseFormReturn } from 'react-hook-form';
import { StringableInput } from './StringableInput';
import { PortSelectionInput } from '../modals/nodeSettingsModal/tabs/Params/PortSelectionInput';
import { StringableWithConfig } from '../modals/nodeSettingsModal/tabs/Params';
import { DataStoryNode } from '../../Node/DataStoryNode';

export function RepeatableInput({
  name,
  form,
  param,
  node,
}: {
  form: UseFormReturn<{
    [x: string]: any;
  }, any>
  name: string,
  param: RepeatableParam<Param[]>
  node: DataStoryNode,
}) {
  const defaultRows = () => {
    if(param.value.length === 0) return [structuredClone(param.row)]

    return param.value
  }

  const [localRows, setLocalRows] = useState<any[]>(defaultRows());

  const addRow = () => {
    console.log('Adding row!')

    console.log(
      'localRows BEFORE',
      structuredClone(localRows)
    )

    console.log(
      'param.row',
      structuredClone(param.row)
    )

    setLocalRows([
      ...JSON.parse(JSON.stringify((localRows))),
      JSON.parse(JSON.stringify((param.row)))
    ])
  }

  return (
    <div className="flex flex-col text-xs w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-gray-50 text-gray-400">
          <tr>
            {param.row.map((column: any) => {
              return <th
                key={column.name}
                scope="col"
                className="px-6 py-3 border"
              >{column.label}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {localRows.map((row, i) => {
            return (<tr
              className="bg-white border-b dark:border-gray-700"
              key={i}
            >
              {param.row.map((column: Param) => {
                return (<td
                  key={column.name}
                  scope="row"
                  className="border font-medium whitespace-nowrap bg-gray-50 align-top"
                >
                  {column.type === 'StringableParam' && <StringableWithConfig
                    form={form}
                    param={column}
                    {...column}
                    name={`${name}.${i}.${column.name}`}
                    node={node}
                  />}
                  {column.type === 'PortSelectionParam' && <PortSelectionInput
                    form={form}
                    param={column}
                    {...column}
                    name={`${name}.${i}.${column.name}`}
                    node={node}
                  />}
                </td>)
              })}
            </tr>)
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
