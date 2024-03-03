import { Param, StringableParam, get } from '@data-story/core';
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
  onCursorPositionChange,
}: {
  form: UseFormReturn<{
    [x: string]: any;
  }, any>
  name: string,
  param: StringableParam,
  onCursorPositionChange: (position: number) => void // Add this line
}) {
  // State to keep track of the number of rows and cursor position
  const [rows, setRows] = useState(calculateRows(String(param.value)));

  const handleCursorChange = (event: any) => {
    // Get the current cursor position
    const cursorPosition = event.target.selectionStart;
    // Notify the parent component about the cursor position change
    if (onCursorPositionChange) {
      onCursorPositionChange(cursorPosition);
    }
  };

  // Effect to listen for form changes - primarily for external updates
  useEffect(() => {
    const subscription = form.watch((value, formEvent) => {
      if (formEvent.name === `params.${name}` && formEvent.type === 'change') {
        try {
          const fieldValue = get(value.params, name)
          const newRows = calculateRows(fieldValue);
          setRows(newRows);
        } catch (e) {
          // Handle error or TODO note
        }
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
          {...form.register(`${name}`)}
          onSelect={handleCursorChange}
        />
        : <input
          className="text-xs p-2 w-full bg-gray-50"
          {...form.register(`${name}`)}
        />
      }
    </div>
  );
}
