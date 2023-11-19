import { UseFormRegister, UseFormReturn } from 'react-hook-form';

export function Stringable({
  name,
  form,
}: {
  form: UseFormReturn<{
    [x: string]: any;
  }, any>  
  name: string,
}) {
  return (
    <div className="flex w-full bg-gray-50 text-gray-500">
      <input
        className="text-xs p-2 w-full bg-gray-50"
        {...form.register(`params.${name}`)}
      >
      </input>      
    </div>
  );
}
