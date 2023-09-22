"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveFrom = void 0;
const Param_1 = require("./Param");
const ComputerFactory_1 = require("./ComputerFactory");
// TODO is this duplicating ComputerFactory?
const deriveFrom = (computerConfig, options) => {
    const template = new ComputerFactory_1.ComputerFactory().get(computerConfig);
    template.name = options.name;
    template.tags = [
        ...(template.tags || []),
        ...(options.tags || []),
    ];
    template.category = options.category || template.category;
    template.label = options.label || template.label;
    if (!template.params)
        template.params = {};
    template.params = Object.assign(Object.assign({}, Param_1.DefaultParams), template.params);
    for (const [paramName, paramValue] of Object.entries(options.params || {})) {
        template.params[paramName].value = paramValue;
    }
    return template;
};
exports.deriveFrom = deriveFrom;
