import { UseFormRegister } from 'react-hook-form';

export function Number_({
  id,
  register,
}: {
  id: string,
  register: UseFormRegister<Record<string, any>>,  
}) {
  return (
    <input
      type="number"
      className="border p-2  w-full"
      {...register(id)}
    />
  );
}
