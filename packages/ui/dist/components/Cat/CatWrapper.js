"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatWrapper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Cat_1 = require("./Cat");
const CatStore_1 = require("./CatStore");
const CatWrapper = () => {
    const store = (0, react_1.useRef)((0, CatStore_1.createCatStore)()).current;
    return ((0, jsx_runtime_1.jsx)(CatStore_1.CatStoreContext.Provider, Object.assign({ value: store }, { children: (0, jsx_runtime_1.jsx)(Cat_1.Cat, {}) })));
};
exports.CatWrapper = CatWrapper;
