"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerRegistry = void 0;
/**
 * The internal registry of all computers
 */
const computers = (() => {
    const map = new Map();
    // for(const config of Object.values(computerConfigs)) {
    //   const computer = new ComputerFactory().get(config)
    //   map.set(computer.name, computer)
    // }
    return map;
})();
/**
 * The public registry of all computers
 */
exports.ComputerRegistry = {
    all() {
        return computers;
    },
};
