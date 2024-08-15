import { useCallback, useEffect } from 'react';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

export function useEscapeKey(handleClose: () => void,  flowRef?: React.RefObject<HTMLDivElement>) {
  const handleEscKey = useCallback((event: KeyboardEvent) => {
    if (event.key === KEY_NAME_ESC) {
      handleClose();
      flowRef?.current?.focus();
    }
  }, [handleClose]);

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}
