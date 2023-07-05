import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'

export const InterPolatableTextArea = ({ form, label, rows, id, inputSchema }: {
  label: string,
  id: string,
  rows: number,
  form: UseFormReturn<{
    [x: string]: any;
  }>,
  inputSchema: any
}) => {
  const [i] = useState('')

  return (<div
    className="flex flex-col"
    key={id}
  >
    <label className="mt-2 mb-1 text-xs text-gray-400">{label}</label>
    <div className="flex w-full">
      <textarea
        rows={rows}
        placeholder=""
        className="w-full text-xs px-2 py-1 border border-blue-200"
        {...form.register(id)}
      >
      </textarea>
      <select
          value={i}
          onChange={(e) => {
            form.setValue(
              id,
              form.getValues(id) + '${' + e.target.value + '}'
            )
          }}
          className="ml-1 max-h-6 border border-gray-300 text-xs w-6 text-gray-300 bg-gray-300 hover:border-gray-400 focus:outline-none appearance-none">
          <option></option>
          {Object.keys(inputSchema).map((key) => {
            return <option key={key}>{key}</option>
          })}
      </select> 

    </div>
  </div>)
}