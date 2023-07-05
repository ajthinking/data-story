import { UseFormRegister } from 'react-hook-form'

export const Select = ({ register, label, id, options }: {
  register: UseFormRegister<Record<string, any>>
  label: string,
  id: string,
  options: string[]
}) => {
  return (<div
    className="flex flex-col"
    key={id}
  >
    <label className="mt-2 mb-1 text-xs text-gray-400">{label}</label>
    <select
      className="w-full text-xs px-2 py-1 border rounded border-blue-200"
      {...register(id)}
    >
      {options!.map((option: string) => {
        return (<option key={option} value={option}>{option}</option>)
      })} 
    </select>
  </div>)
}