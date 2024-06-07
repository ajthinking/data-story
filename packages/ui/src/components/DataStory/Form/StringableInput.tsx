import { get, StringableParam } from '@data-story/core';
import { RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FormFieldContext, FormFieldWrapper, useFormField } from './UseFormField';
import { MyCodeMirrorComponent, MyCodeMirrorComponent1, useCodeMirror } from './editor';
import { Controller, ControllerRenderProps, RefCallBack, useController } from 'react-hook-form';

// Function to calculate the number of rows based on content
const calculateRows = (content: string) => {
  const newLines = content.split('\n').length;
  return Math.max(newLines, 1); // Ensure a minimum of 1 row
};

interface StringableInput {
  param: StringableParam;
  onCursorPositionChange: (position: number) => void; // Add this line
  field?: ControllerRenderProps<any, `${string}.value`>;
}

export function StringableInputComponent({
  param,
  onCursorPositionChange,
}: StringableInput) {
  const { fieldName } = useContext(FormFieldContext);
  const editorRef:  RefObject<any> = useRef(null);
  const { getValues, watch, setValue, control} = useFormField();

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

  useEffect(() => {
    const subscription = watch((value, formEvent) => {
      if (formEvent.name === fieldName && formEvent.type === 'change') {
        try {
          const fieldValue = get(value, fieldName)
          const newRows = calculateRows(fieldValue);
          setRows(newRows);
        } catch(e) {
          // Handle error or TODO note
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [fieldName, watch]);

  const handleChange = (e) => {
    // console.log('e', e);
    // setValue(e.target.value);
    // field.onChange(e);
  }

  return (
    <div className="flex w-full text-gray-500">
      <MyCodeMirrorComponent1 />
      {/*{param.multiline*/}
      {/*  ? <textarea*/}
      {/*    className="text-xs p-2 w-full bg-gray-50 font-mono"*/}
      {/*    rows={rows}*/}
      {/*    // onSelect={handleCursorChange}*/}
      {/*    value={getValues()}*/}
      {/*    // onChange={handleChange}*/}
      {/*    ref={editorRef}*/}
      {/*  />*/}
      {/*  : <input*/}
      {/*    value={getValues()}*/}
      {/*    // onChange={handleChange}*/}
      {/*    ref={editorRef}*/}
      {/*    className="text-xs p-2 w-full bg-gray-50 font-mono"*/}
      {/*  />*/}
      {/*}*/}
    </div>
  );
}

export function StringableInput(params: StringableInput) {
  return <FormFieldWrapper fieldName={'value'}>
    <StringableInputComponent {...params} />
  </FormFieldWrapper>
}
