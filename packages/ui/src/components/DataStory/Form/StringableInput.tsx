import { StringableParam } from '@data-story/core';
import { useCallback, useMemo } from 'react';
import { FormFieldWrapper, useFormField } from './UseFormField';
import { autocompletion } from '@codemirror/autocomplete';
import CodeMirror, { type BasicSetupOptions } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';

interface StringableInput {
  param: StringableParam;
  onCursorPositionChange: (position: number) => void; // Add this line
}

const basicSetup: BasicSetupOptions = {
  lineNumbers: false,
  highlightActiveLineGutter: false,
  highlightActiveLine: false,
  foldGutter: false,
  autocompletion: true,
  syntaxHighlighting: true,
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
  const { getValues, setValue } = useFormField();

  const myCompletions = useCallback((context) => {
    let before = context.matchBefore(parameterReg);
    if (!context.explicit && !before) return null;
    return {
      from: before ? before.from : context.pos,
      options: completions,
      validFor: parameterReg,
    };
  }, []);

  const extensions = useMemo(() => {
    const evaulation = param.input?.Evaluation;
    if (evaulation === 'JS_FUNCTION' || evaulation === 'JS_EXPRESSION') {
      return [ javascript(), autocompletion({ override: [ myCompletions ] }) ];
    }
    if (evaulation === 'JSON') {
      return [ json(), autocompletion({ override: [ myCompletions ] }) ];
    }
    return [ autocompletion({ override: [ myCompletions ] }) ];
  }, [ myCompletions, param.input?.Evaluation ]);

  const onChange = useCallback((value) => {
    setValue(value);
  }, [ setValue ]);

  return (
    <div className="flex w-full text-gray-500 max-h-64 overflow-y-auto">
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
  return <FormFieldWrapper fieldName={'rawValue'}>
    <StringableInputComponent {...params} />
  </FormFieldWrapper>;
}
