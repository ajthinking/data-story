import { StringableParam } from '@data-story/core';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { FormFieldWrapper, useFormField } from './UseFormField';
import { autocompletion } from '@codemirror/autocomplete';
import CodeMirror, { ReactCodeMirrorRef, type BasicSetupOptions } from '@uiw/react-codemirror';
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

const oldExecCmd = document.execCommand.bind(document);
const editors = new Set<Element>();

console.log('oold execmd', oldExecCmd);
console.log('editor', editors);

function shouldHack(el: Element | null) {
  for(const e of editors) {
    if (e && e.contains(el)) {
      return true;
    }
  }
  return false;
}

// editors.add(...);

export function StringableInputComponent({
  param,
  onCursorPositionChange,
}: StringableInput) {
  const { getValues, setValue } = useFormField();
  const codeMirrorRef = useRef<ReactCodeMirrorRef>(null);

  useEffect(() => {
    document.execCommand = (cmd, ...args) => {
      const el = document.activeElement;
      console.log('check editor', el, editors, editors.has(el!))
      if (el && shouldHack(el)) {
        if (cmd == 'paste') {
          console.log('document paste')
          navigator.clipboard.readText().then(txt => {
            const dt = new DataTransfer();
            dt.setData('text/plain', txt);
            el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt }));
          }).catch(console.error);

          return true;
        } else if (cmd == 'cut' || cmd == 'copy') {
          console.log('cmd', cmd)
          const dt = new DataTransfer();
          el.dispatchEvent(new ClipboardEvent(cmd, { clipboardData: dt }));
          void navigator.clipboard.writeText(dt.getData('text/plain'));

          return true;
        }
      }

      return oldExecCmd(cmd, ...args);
    };
    console.log(document.execCommand, 'execomanad after')
  }, [])
  editors.add(codeMirrorRef?.current?.editor!);

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
      return [javascript(), autocompletion({ override: [myCompletions] })];
    }
    if (evaulation === 'JSON') {
      return [json(), autocompletion({ override: [myCompletions] })];
    }
    return [autocompletion({ override: [myCompletions] })];
  }, [myCompletions, param.input?.Evaluation]);

  const onChange = useCallback((value, viewUpdate) => {
    setValue(value);
    console.log('onchange')
  }, [setValue]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Stop the event from bubbling up to the VSCode iframe event handler
    //e.stopPropagation();
    console.log('keydown')
  }, []);

  return (
    <div onKeyDown={handleKeyDown} className="flex w-full text-gray-500 max-h-64 overflow-y-auto">
      <input/>
      <div contentEditable className='w-150 h-30'>div</div>
      <CodeMirror
        ref={codeMirrorRef}
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
  </FormFieldWrapper>
}
