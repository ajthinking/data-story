import { UseFormRegister } from 'react-hook-form';

export function Interpretable({
  id,
  register,
  setValue,
  getValues,
  interpretableProperties,
  interpretableFunctions,
}: {
  id: string,
  register: UseFormRegister<Record<string, any>>,
  setValue: any,
  getValues: any,
  interpretableProperties: string[],
  interpretableFunctions: string[],  
}) {
  return (
    <div className="flex w-full">
      <input
        className="text-xs p-2 w-full"
        {...register(id)}
      >
      </input>
      <select
        defaultValue="___PROP"
        className="text-xs appearance-none border p-2 focus:outline-none focus:ring focus:border-blue-300"
        onChange={(event) => {
          setValue(
            id,
            getValues(id) + '${' + event.target.value + '}'
          )
        }}
      >
        <option disabled value={'___PROP'}>prop</option>
        {interpretableProperties.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <select
        defaultValue="___FUNC"
        className="text-xs appearance-none border p-2 focus:outline-none focus:ring focus:border-blue-300"
        onChange={(event) => {
          const current = getValues(id)
          const func = event.target.value

          setValue(id, `${current}@${func}(`)
        }}
      >
        <option disabled value={'___FUNC'}>func</option>
        {interpretableFunctions.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>      
    </div>
  );
}
