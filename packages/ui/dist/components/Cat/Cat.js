"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CatStore_1 = require("./CatStore");
const zustand_1 = require("zustand");
const Cat = () => {
    const store = (0, react_1.useContext)(CatStore_1.CatStoreContext);
    if (!store)
        throw new Error('Missing CatStoreContext.Provider in the tree');
    const { meows, incrementMeows } = (0, zustand_1.useStore)(store, (s) => ({
        meows: s.meows,
        incrementMeows: s.incrementMeows,
    }));
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("span", { children: ["Cat meowed ", meows, " times"] }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: incrementMeows }, { children: "Meow!" }))] }));
};
exports.Cat = Cat;
