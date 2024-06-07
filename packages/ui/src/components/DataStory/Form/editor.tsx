import { basicSetup } from 'codemirror'
import { autocompletion } from '@codemirror/autocomplete'
import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useFormField } from './UseFormField';

export const completions = [
  { label: '@panic', type: 'keyword' },
  { label: '$park', type: 'constant', info: 'Test completion' },
  { label: '@password', type: 'variable' },
];

export function CodeMirrorComponent() {
  const { getValues, watch, setValue, control} = useFormField();

  const myCompletions = useCallback((context) => {
    let before = context.matchBefore(/[$@][a-zA-Z0-9]*$/);
    if (!context.explicit && !before) return null;
    return {
      from: before ? before.from : context.pos,
      options: completions,
      validFor: /^[$@][a-zA-Z0-9]+$/,
    };
  }, []);

  const extensions = [
    autocompletion({ override: [myCompletions] })];

  const onChange = useCallback((value, viewUpdate) => {
    setValue(value);
    console.log('value:', value);
  }, [setValue]);
  return (
    <CodeMirror
      value={getValues()}
      height="200px"
      // theme={myTheme}
      extensions={extensions}
      onChange={onChange}
    />
  );
}
