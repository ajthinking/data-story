"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeDescriptionFactory = void 0;
exports.NodeDescriptionFactory = {
    fromComputer: (computer) => {
        return {
            name: computer.name,
            label: computer.label,
            category: computer.category,
            inputs: computer.inputs,
            outputs: computer.outputs,
            params: computer.params,
            tags: computer.tags,
        };
    },
};
