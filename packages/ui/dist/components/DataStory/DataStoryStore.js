"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStoryStoreContext = exports.createDataStoryStore = void 0;
const react_1 = require("react");
const zustand_1 = require("zustand");
const createDataStoryStore = (initProps) => {
    const DEFAULT_PROPS = {
    // TODO
    };
    return (0, zustand_1.createStore)()((set, get) => (Object.assign(Object.assign({}, DEFAULT_PROPS), initProps)));
};
exports.createDataStoryStore = createDataStoryStore;
exports.DataStoryStoreContext = (0, react_1.createContext)(null);
