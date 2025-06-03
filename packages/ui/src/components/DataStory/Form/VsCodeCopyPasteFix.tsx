import { KeyboardEvent, KeyboardEventHandler } from 'react';

export const keyboardHandler: KeyboardEventHandler | undefined = (() => {
  if (!/Mac/.test(navigator.platform) && window['vscode'] != null) {
    return (e: KeyboardEvent) => {
      e.stopPropagation();
    };
  } else {
    return undefined;
  }
})();
