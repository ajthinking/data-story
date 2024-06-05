import {basicSetup, EditorView} from 'codemirror'
import {autocompletion} from '@codemirror/autocomplete'
import { useEffect } from 'react';

// Our list of completions (can be static, since the editor
/// will do filtering based on context).
const completions = [
  {label: '@panic', type: 'keyword'},
  {label: '$park', type: 'constant', info: 'Test completion'},
  {label: '@password', type: 'variable'},
]

const EditorExp: RegExp = /[$@][a-zA-Z0-9]*$/;

// view destroy

// 封装一个 useCodeMirror hook
const useCodeMirror = ({
  container,
  completions,
  defaultDoc
}: {
  container:  HTMLDivElement | null,
  completions: {label: string, type: string, info?: string}[],
  defaultDoc?: string
}) => {
  useEffect(() => {
    const myCompletions = (context) => {
      console.log(context, 'context111')
      let before = context.matchBefore(EditorExp)
      if (!context.explicit && !before) return null
      return {
        from: before ? before.from : context.pos,
        options: completions,
        validFor: EditorExp
      }
    }

    if (!container) return
    let view = new EditorView({
      doc: defaultDoc || '',
      extensions: [
        basicSetup,
        autocompletion({override: [myCompletions]})
      ],
      parent: container
    })
    return () => view.destroy()
  }, [container, defaultDoc, completions])
}
