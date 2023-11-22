import { Param, Repeatable as RepeatableMode, Repeatable } from '@data-story/core';
import { useState } from 'react';
import { UseFormRegister, UseFormReturn } from 'react-hook-form';
import { Stringable } from './Stringable';

export function Repeatable({
  name,
  form,
  mode,
}: {
  form: UseFormReturn<{
    [x: string]: any;
  }, any>  
  name: string,
  mode: RepeatableMode<Param[]>
}) {
  const defaultRows = () => {
    if(mode.value.length === 0) return [structuredClone(mode.row)]
    
    return mode.value
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
      structuredClone(mode.row)
    )

    setLocalRows([
      ...JSON.parse(JSON.stringify((localRows))),
      JSON.parse(JSON.stringify((mode.row)))
    ])    
  }

  return (
    <div className="flex flex-col text-xs w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-gray-50 text-gray-400">
          <tr>
            {mode.row.map((column: any) => {
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
              {mode.row.map((column: Param) => {

                return (<td
                  key={column.name}
                  scope="row"
                  className="border font-medium whitespace-nowrap"
                >
                  {column.inputMode.type === 'Stringable' && <Stringable
                    form={form}
                    {...column}
                    name={`${name}.${i}.${column.name}`}
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
