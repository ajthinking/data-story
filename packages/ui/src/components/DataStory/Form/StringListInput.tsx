import { useCallback } from 'react';
import { FormComponent, FormComponentProps } from '../types';
import { FormFieldWrapper, useFormField } from './UseFormField';
import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';
import { StringListParam } from '@data-story/core/*';

const basicSetup: BasicSetupOptions = {
  lineNumbers: false,
  highlightActiveLineGutter: true,
  highlightActiveLine: true,
  foldGutter: true,
  autocompletion: true
};

function StringListInputComponent({
  param,
  node,
}: FormComponentProps) {
  const { getValues,  setValue} = useFormField();

  console.log(getValues(), 'StringListInputComponent getValues()');
  console.log(param, 'StringListInputComponent param');
  const onChange = useCallback((value, viewUpdate) => {
    setValue(value);
  }, [setValue]);

  return (
    <div className="flex w-full text-gray-500 max-h-64 overflow-y-auto">
      <CodeMirror
        className="text-xs h-full w-full bg-white font-mono"
        value={(getValues() ?? '').toString()}
        basicSetup={basicSetup}
        onChange={onChange}
      />
    </div>
  );
}

export function StringListInput(params: FormComponentProps) {
  return <FormFieldWrapper fieldName={'value'}>
    <StringListInputComponent {...params} />
  </FormFieldWrapper>
}

export class StringListComponent implements FormComponent<StringListParam> {
  getComponent(params: FormComponentProps) {
    return (<StringListInput {...params} />)
  }

  getType() {
    return 'StringListParam'
  }
}