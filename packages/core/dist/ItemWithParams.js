"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemWithParams = exports.isItemWithParams = void 0;
const evalMath_1 = require("./utils/evalMath");
const isItemWithParams = (item) => {
    // This does not always catch all cases
    if (item instanceof ItemWithParams)
        return true;
    if (item !== null
        && typeof item === 'object'
        && 'type' in item && item.type === 'ItemWithParams'
        && 'value' in item
        && 'params' in item)
        return true;
    // const isLikelyItemWithParams = typeof i === 'object' && 'value' in i && 'params' in i
    return false;
};
exports.isItemWithParams = isItemWithParams;
class ItemWithParams {
    constructor(value, params) {
        this.type = 'ItemWithParams';
        this.value = value;
        this.params = new Proxy({}, {
            get: (_, prop) => {
                const paramValue = params[prop];
                // We can only use params that exist
                if (!paramValue)
                    return undefined;
                // We can only interpolate strings params
                if (typeof paramValue !== 'string')
                    return paramValue;
                // We can only use object properties when interpolating
                if (typeof this.value !== 'object')
                    return paramValue;
                /** Replace template strings with item properties
                * Example: { greeting: "Hi ${name}!"}
                * Becomes: { greeting: "Hi Bob!"}
                * When the item value is { name: "Bob" }
                */
                let value = paramValue.replace(/\${(\w+)}/g, (_, name) => {
                    return this.value[name];
                });
                /** Replaces function calls */
                value = value.replace(/@(\w+)\((.*)\)/g, (_, fn, expression) => {
                    if (fn === 'evalMath')
                        return String((0, evalMath_1.evalMath)(expression));
                    // If we don't know the function, just return the expression
                    return expression;
                });
                return value;
            }
        });
    }
}
exports.ItemWithParams = ItemWithParams;
const i1 = { i: 1 };
