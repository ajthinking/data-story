import { UseFormRegister } from 'react-hook-form';

export function Select({
  id,
  register,
  options,
}: {
  id: string,
  register: UseFormRegister<Record<string, any>>,  
  options: {
    label: string,
    value: string
  }[]
}) {
  return (
    <select
      {...register(id)}
      className="p-2 text-xs">
      <option></option>
      {options.map(option => {
        return <option className="text-gray-400" key={option.value}>{option.label}</option>
      })}
    </select> 
  );
}
