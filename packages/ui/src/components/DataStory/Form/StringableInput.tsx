import { StringableParam, get } from '@data-story/core';
import { useContext, useEffect, useState } from 'react';
import { SubField, SubFieldContext, useFormField } from './UseFormField';

// Function to calculate the number of rows based on content
const calculateRows = (content: string) => {
  const newLines = content.split('\n').length;
  return Math.max(newLines, 1); // Ensure a minimum of 1 row
};

interface StringableInput {
  param: StringableParam;
  onCursorPositionChange: (position: number) => void; // Add this line
}

export function StringableInputComponent({
  param,
  onCursorPositionChange,
}: StringableInput) {
  const {fieldName} = useContext(SubFieldContext);

  const { getValues,  watch, register } = useFormField()

  // State to keep track of the number of rows and cursor position
  const [rows, setRows] = useState(calculateRows(String(getValues())));

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
      if (formEvent.name === fieldName && formEvent.type === 'change') {
        try {
          const fieldValue = get(value, fieldName)
          const newRows = calculateRows(fieldValue);
          setRows(newRows);
        } catch (e) {
          // Handle error or TODO note
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [fieldName, watch]);

  return (
    <div className="flex w-full text-gray-500">
      {param.multiline
        ? <textarea
          className="text-xs p-2 w-full bg-gray-50 font-mono"
          rows={rows}
          {...register()}
          onSelect={handleCursorChange}
        />
        : <input
          className="text-xs p-2 w-full bg-gray-50 font-mono"
          {...register()}
        />
      }
    </div>
  );
}

export function StringableInput(params: StringableInput) {
  return <SubField fieldName={'value'}>
    <StringableInputComponent {...params} />
  </SubField>
}
