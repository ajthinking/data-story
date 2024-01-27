import { Param, Stringable, get } from '@data-story/core';
import { useEffect, useState } from 'react';
import { UseFormRegister, UseFormReturn } from 'react-hook-form';

// Function to calculate the number of rows based on content
const calculateRows = (content: string) => {
  const newLines = content.split('\n').length;
  return Math.max(newLines, 1); // Ensure a minimum of 1 row
};

export function StringableInput({
  name,
  form,
  param,
}: {
  form: UseFormReturn<{
    [x: string]: any;
  }, any>  
  name: string,
  param: Stringable
}) {
  // State to keep track of the number of rows
  const [rows, setRows] = useState(calculateRows(String(param.value)));

  // Effect to update rows when the content changes
  useEffect(() => {
    const subscription = form.watch((value, formEvent) => {
      // console.log({
      //   msg: 'CHANGE!',
      //   name,
      //   value,
      //   formEvent
      // })
      if (formEvent.name === `params.${name}` && formEvent.type === 'change') {
        try {
          const fieldValue = get(value.params, name)

          const newRows = calculateRows(fieldValue);
          setRows(newRows);
        } catch (e) {
          // TODO: Refactor to support Repeatables
        }
      } else {
        // console.log('COuld not pick up change!')
      }
    });
    return () => subscription.unsubscribe();
  }, [form, name]);

  return (
    <div className="flex w-full text-gray-500">
      {param.multiline
        ? <textarea
          className="text-xs p-2 w-full bg-gray-50"
          rows={rows}
          {...form.register(`params.${name}`)}
        />
        : <input
          className="text-xs p-2 w-full bg-gray-50"
          {...form.register(`params.${name}`)}
        />
      }
    </div>
  );
}
