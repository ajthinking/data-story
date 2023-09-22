"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputDevice = void 0;
const ItemWithParams_1 = require("./ItemWithParams");
class OutputDevice {
    constructor(portLinkMap = {}, memory) {
        this.portLinkMap = portLinkMap;
        this.memory = memory;
    }
    push(items) {
        return this.pushTo('output', items);
    }
    pushTo(name, itemable) {
        const connectedLinks = this.portLinkMap[name];
        // When outputting we should not be in a params infused ItemWithParams
        const items = itemable.map(i => (0, ItemWithParams_1.isItemWithParams)(i) ? i.value : i);
        for (const linkId of connectedLinks) {
            // Update items on link
            this.memory.pushLinkItems(linkId, items);
            // Update link counts
            const count = this.memory.getLinkCount(linkId);
            this.memory.setLinkCount(linkId, count + items.length);
        }
    }
    /**
     *
     * (Test) Utility to get items have been outputted through a port
     */
    itemsOutputtedThrough(name) {
        var _a;
        const [connectedLink] = this.portLinkMap[name];
        return (_a = this.memory.getLinkItems(connectedLink)) !== null && _a !== void 0 ? _a : [];
    }
}
exports.OutputDevice = OutputDevice;
