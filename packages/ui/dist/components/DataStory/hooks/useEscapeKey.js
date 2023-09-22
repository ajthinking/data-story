"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEscapeKey = void 0;
const react_1 = require("react");
const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';
function useEscapeKey(handleClose) {
    const handleEscKey = (0, react_1.useCallback)((event) => {
        if (event.key === KEY_NAME_ESC) {
            handleClose();
        }
    }, [handleClose]);
    (0, react_1.useEffect)(() => {
        document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);
        return () => {
            document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
        };
    }, [handleEscKey]);
}
exports.useEscapeKey = useEscapeKey;
