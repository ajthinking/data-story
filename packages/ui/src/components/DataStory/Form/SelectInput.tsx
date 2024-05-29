import { SelectParam } from '@data-story/core';
import { useFormContext } from 'react-hook-form';

export function SelectInput({
  param,
  name,
}: {
  name: string,
  param: SelectParam
}) {
  const {register} = useFormContext();

  return (
    <div className="flex w-full text-gray-500">
      <select className="bg-gray-50 text-xs px-2 py-2 w-full"
        {...register(name)}
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
