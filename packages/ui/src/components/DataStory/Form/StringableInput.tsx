import { StringableParam, get } from '@data-story/core';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// Function to calculate the number of rows based on content
const calculateRows = (content: string) => {
  const newLines = content.split('\n').length;
  return Math.max(newLines, 1); // Ensure a minimum of 1 row
};

export function StringableInput({
  name,
  param,
  onCursorPositionChange,
}: {
  name: string,
  param: StringableParam,
  onCursorPositionChange: (position: number) => void // Add this line
}) {
  const stringName = useMemo(() => `${name}.value`, [name]);
  const { getValues, setValue, watch, register } = useFormContext()

  // change Stringable format from string to object to maintain compatibility
  const latestValue = useMemo(() => {
    const latestValue = getValues(stringName) ?? getValues(name);
    setValue(stringName, latestValue);
    return latestValue;
  }, [getValues, name, setValue, stringName]);

  // State to keep track of the number of rows and cursor position
  const [rows, setRows] = useState(calculateRows(String(latestValue)));

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
    const subscription = watch((value, formEvent) => {
      if (formEvent.name === stringName && formEvent.type === 'change') {
        try {
          const fieldValue = get(value, stringName)
          const newRows = calculateRows(fieldValue);
          setRows(newRows);
        } catch (e) {
          // Handle error or TODO note
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [stringName, watch]);

  return (
    <div className="flex w-full text-gray-500">
      {param.multiline
        ? <textarea
          className="text-xs p-2 w-full bg-gray-50 font-mono"
          rows={rows}
          {...register(`${stringName}`)}
          onSelect={handleCursorChange}
        />
        : <input
          className="text-xs p-2 w-full bg-gray-50 font-mono"
          {...register(`${stringName}`)}
        />
      }
    </div>
  );
}
