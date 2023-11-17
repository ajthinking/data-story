import { useEffect, useState } from 'react';
import { String_ } from './String_';
import { Map_ } from './Map_';
import { Interpretable } from './Interpretable';
import { UseFormRegister } from 'react-hook-form';
import { Number_ } from './Number_';
import { Select } from './Select';
import { Param, ParamV2 } from '@data-story/core';
import { DynamicInput } from './DynamicInput';

export function Repeatable({
  id,
  register,
  param,
  setValue,
  getValues,
}: {
  id: string,
  register: UseFormRegister<Record<string, any>>,
  param: any,
  setValue: any,
  getValues: any,
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

  useEffect(() => {
    console.log(
      'localRows AFTER',
      structuredClone(localRows)
    )    
  })

  return (
    <div className="flex flex-col text-xs">
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
              {param.row.map((column: any) => {
                return (<th
                  key={column.name}
                  scope="row"
                  className="border font-medium whitespace-nowrap"
                >
                  {column.type === 'String_' && <String_
                    id={column.name}
                    key={column.name}
                    register={register}
                    {...column}
                  ></String_>}

                  {column.type === 'DynamicInput' && <DynamicInput
                    id={column.name}
                    key={column.name}
                    register={register}
                    getValues={getValues}
                    setValue={setValue}
                    param={column}
                    {...column}
                  ></DynamicInput>}                  
                </th>)
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
