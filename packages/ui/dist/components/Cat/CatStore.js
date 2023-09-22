"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatStoreContext = exports.createCatStore = void 0;
const react_1 = require("react");
const zustand_1 = require("zustand");
const createCatStore = (initProps) => {
    const DEFAULT_PROPS = {
        meows: 0,
    };
    return (0, zustand_1.createStore)()((set, get) => (Object.assign(Object.assign(Object.assign({}, DEFAULT_PROPS), initProps), { incrementMeows: () => set(state => ({ meows: state.meows + 1 })) })));
};
exports.createCatStore = createCatStore;
exports.CatStoreContext = (0, react_1.createContext)(null);
