import { UseFormRegister } from 'react-hook-form';

export function String_({
  id,
  register,
}: {
  id: string,
  register: UseFormRegister<Record<string, any>>,  
}) {
  return (
    <input
      className="border p-2 w-full text-xs"
      {...register(id)}
    />
  );
}
