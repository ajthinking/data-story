"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedInputDevice = void 0;
/**
 * A specialized input device
 * Providing a link between parent and sub diagrams
 * An Input node may pull items from a parent diagram input device
 */
class NestedInputDevice {
    constructor(inputDevice) {
        this.inputDevice = inputDevice;
    }
    pull(count) {
        return this.inputDevice.pull(count);
    }
    pullFrom(name, count) {
        return this.inputDevice.pullFrom(name, count);
    }
    havePort(name) {
        return this.inputDevice.havePort(name);
    }
    haveItemsAtInput(name) {
        return this.inputDevice.haveItemsAtInput(name);
    }
    haveAllItemsAtAllInputs() {
        return this.inputDevice.haveAllItemsAtAllInputs();
    }
    haveAllItemsAtInput(name) {
        return this.inputDevice.haveAllItemsAtInput(name);
    }
    haveItemsAtAnyInput() {
        return this.inputDevice.haveItemsAtAnyInput();
    }
    setItemsAt(linkId, items) {
        this.inputDevice.setItemsAt(linkId, items);
    }
}
exports.NestedInputDevice = NestedInputDevice;
