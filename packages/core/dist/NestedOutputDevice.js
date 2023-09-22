"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedOutputDevice = void 0;
class NestedOutputDevice {
    constructor(outputDevice) {
        this.outputDevice = outputDevice;
    }
    push(items) {
        return this.outputDevice.push(items);
    }
    pushTo(name, items) {
        return this.outputDevice.pushTo(name, items);
    }
}
exports.NestedOutputDevice = NestedOutputDevice;
