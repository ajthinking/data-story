import {  StringableParam } from '@data-story/core';
import {  useCallback} from 'react';
import { FormFieldWrapper, useFormField } from './UseFormField';
import { autocompletion } from '@codemirror/autocomplete';
import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';

interface StringableInput {
  param: StringableParam;
  onCursorPositionChange: (position: number) => void; // Add this line
}

const basicSetup: BasicSetupOptions = {
  lineNumbers: false,
  highlightActiveLineGutter: false,
  highlightActiveLine: false,
  foldGutter: false,
  autocompletion: true
};

/**
 * todo: completions are hardcoded here, should be fetched from param
 */
const completions = [
  { label: '@panic', type: 'keyword' },
  { label: '$park', type: 'constant', info: 'Test completion' },
  { label: '@password', type: 'variable' },
];

const parameterReg = /[$@][a-zA-Z0-9]*$/;

export function StringableInputComponent({
  param,
  onCursorPositionChange,
}: StringableInput) {
  const { getValues,  setValue} = useFormField();

  const myCompletions = useCallback((context) => {
    let before = context.matchBefore(parameterReg);
    if (!context.explicit && !before) return null;
    return {
      from: before ? before.from : context.pos,
      options: completions,
      validFor: parameterReg,
    };
  }, []);

  const extensions = [autocompletion({ override: [myCompletions] }), ];

  const onChange = useCallback((value, viewUpdate) => {
    setValue(value);
  }, [setValue]);

  return (
    <div className="flex w-full text-gray-500 h-full">
      <CodeMirror
        className="text-xs h-full w-full bg-white font-mono"
        value={(getValues() ?? '').toString()}
        basicSetup={basicSetup}
        extensions={extensions}
        onChange={onChange}
      />
    </div>
  );
}

export function StringableInput(params: StringableInput) {
  return <FormFieldWrapper fieldName={'value'}>
    <StringableInputComponent {...params} />
  </FormFieldWrapper>
}
