import { SelectParam } from '@data-story/core';
import { UseFormReturn } from 'react-hook-form';

export function SelectInput({
  param,
  form,
  name,
}: {
  form: UseFormReturn<{
    [x: string]: any;
  }, any>
  name: string,
  param: SelectParam
}) {
  return (
    <div className="flex w-full text-gray-500 w-full">
      <select className="bg-gray-50 text-xs px-2 py-2 w-full"
        {...form.register(name)}
      >
        {param.options.map((option) => {
          return <option
            value={option.value}
            key={option.value}
          >{option.label}</option>
        })}
      </select>

    </div>
  );
}
