import { useCallback } from 'react';
import { FormComponent, FormComponentProps } from '../types';
import { FormFieldWrapper, useFormField } from './UseFormField';
import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';
import { StringListParam } from '@data-story/core';
import { javascript } from '@codemirror/lang-javascript';

const basicSetup: BasicSetupOptions = {
  lineNumbers: false,
  highlightActiveLineGutter: false,
  highlightActiveLine: false,
  foldGutter: false,
  autocompletion: false,
  syntaxHighlighting: true,
};
const extensions = [ javascript() ];

function StringListInputComponent({
  param,
  node,
}: FormComponentProps) {
  const { getValues, setValue } = useFormField();

  const onChange = useCallback((value, viewUpdate) => {
    setValue(value);
  }, [ setValue ]);

  return (
    <div className="group flex flex-col-reverse bg-gray-50 h-full border-gray-50 border-2">
      <div className="flex w-full text-gray-500 max-h-64 overflow-y-auto">
        <CodeMirror
          className="text-xs h-full w-full bg-white font-mono"
          value={(getValues() ?? '').toString()}
          basicSetup={basicSetup}
          extensions={extensions}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export function StringListInput(props: FormComponentProps) {
  return <FormFieldWrapper fieldName={props.param.name}>
    <StringListInputComponent {...props} />
  </FormFieldWrapper>;
}

export class StringListComponent implements FormComponent<StringListParam> {
  getComponent(params: FormComponentProps) {
    return (<StringListInput {...params} />);
  }

  getType() {
    return 'StringListParam';
  }
}
