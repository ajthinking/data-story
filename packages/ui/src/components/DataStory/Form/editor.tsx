import {basicSetup, EditorView} from 'codemirror'
import {autocompletion} from '@codemirror/autocomplete'
import { RefObject, useEffect, useRef } from 'react';
import { Controller, RefCallBack, useForm } from 'react-hook-form';
import { useFormField } from './UseFormField';
import { Json } from '../../forms/inputs/json';

export const completions = [
  { label: '@panic', type: 'keyword' },
  { label: '$park', type: 'constant', info: 'Test completion' },
  { label: '@password', type: 'variable' },
];
export const MyCodeMirrorComponent = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const myCompletions = (context) =>  {
      let before = context.matchBefore(/[$@][a-zA-Z0-9]*$/);
      if (!context.explicit && !before) return null;
      return {
        from: before ? before.from : context.pos,
        options: completions,
        validFor: /^[$@][a-zA-Z0-9]+$/,
      };
    }
    if (editorRef.current) {
      const view = new EditorView({
        doc: '// Type a \'p\'\n',
        extensions: [
          basicSetup,
          autocompletion({ override: [myCompletions] }),
        ],
        parent: editorRef.current,
      });

      return () => {
        view.destroy();
      };
    }
  }, []);

  return <div onChange={(event) => {
    console.log(event, 'event changed')
  }} ref={editorRef}></div>;
};

export const useCodeMirror = (ele: RefObject<any>) => {
  useEffect(() => {
    const myCompletions = (context) =>  {
      console.log('context', context)
      let before = context.matchBefore(/[$@][a-zA-Z0-9]*$/);
      if (!context.explicit && !before) return null;
      return {
        from: before ? before.from : context.pos,
        options: completions,
        validFor: /^[$@][a-zA-Z0-9]+$/,
      };
    }
    if (ele.current) {
      console.log('ele', ele)
      const view = new EditorView({
        doc: '// Type a \'p\'\n',
        extensions: [
          basicSetup,
          autocompletion({ override: [myCompletions] }),
          EditorView.updateListener.of(function(update) {
            if (update.docChanged) {
              console.log('update', update.state.doc.toString());
              // control.setValue(name, viewRef.current.state.doc.toString());
            }
          })
        ],
        parent: ele.current,
      });

      return () => {
        view.destroy();
      };
    }
  }, [ele]);
};

export const MyCodeMirrorComponent1 = () => {
  const editorRef = useRef(null);
  const viewRef: React.MutableRefObject< EditorView | null> = useRef(null);
  const { getValues, watch, setValue, control} = useFormField();

  useEffect(() => {
    const completions = [
      { label: '@panic', type: 'keyword' },
      { label: '$park', type: 'constant', info: 'Test completion' },
      { label: '@password', type: 'variable' },
    ];
    function myCompletions(context) {
      let before = context.matchBefore(/[$@][a-zA-Z0-9]*$/);
      if (!context.explicit && !before) return null;
      return {
        from: before ? before.from : context.pos,
        options: completions,
        validFor: /^[$@][a-zA-Z0-9]+$/,
      };
    }
    if (editorRef.current) {
      // const value = JSON.parse(getValues());
      // // JSON.stringify(value, null, 2)
      viewRef.current = new EditorView({
        doc: getValues() ?? '',
        extensions: [
          basicSetup,
          autocompletion({ override: [myCompletions] }),
          EditorView.updateListener.of(function(update) {
            if (update.docChanged) {
              console.log('update', update.state.doc.toString());
              setValue(update.state.doc.toString());
              // control.setValue(name, viewRef.current.state.doc.toString());
            }
          })
        ],
        parent: editorRef.current,
      });

      return () => {
        viewRef.current?.destroy();
      };
    }
  }, [getValues, setValue]);

  return <div
    className="text-xs p-2 w-full bg-gray-50 font-mono"
    ref={editorRef} ></div>;
};
