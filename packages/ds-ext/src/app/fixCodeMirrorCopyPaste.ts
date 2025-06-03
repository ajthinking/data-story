function isInCodeMirrorEditor(el: Element | null) {
  // check if the element is inside div.cm-editor
  let depth = 0;
  let maxDepth = 10;
  while (el) {
    if (el.classList.contains('cm-editor')) {
      return true;
    }
    el = el.parentElement;
    depth++;
    if (depth > maxDepth) {
      break;
    }
  }
  return false;
}

function fixCopyPaste() {
  // @ts-expect-error hacked is defined at runtime
  if (document.execCommand.hacked) {
    return;
  }
  const oldExecCmd = document.execCommand.bind(document);
  const hackExecCommand: typeof document.execCommand = (cmd, ...args) => {
    const el = document.activeElement;
    if (el != null && isInCodeMirrorEditor(el)) {
      if (cmd === 'paste') {
        navigator.clipboard.readText().then(txt => {
          const dt = new DataTransfer();
          dt.setData('text/plain', txt);
          el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt }));
        }).catch(console.error);

        return true;
      } else if (cmd === 'cut' || cmd === 'copy') {
        const dt = new DataTransfer();
        el.dispatchEvent(new ClipboardEvent(cmd, { clipboardData: dt }));
        void navigator.clipboard.writeText(dt.getData('text/plain'));

        return true;
      }
    }

    return oldExecCmd(cmd, ...args);
  };
  // @ts-expect-error hacked is defined at runtime
  hackExecCommand.hacked = true;
  document.execCommand = hackExecCommand;
}

fixCopyPaste();

// see https://github.com/microsoft/vscode/issues/232692 for more info
