"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJson = void 0;
const toJson = (rfInstance) => {
    if (rfInstance) {
        const flow = rfInstance.toObject();
        navigator.clipboard.writeText(JSON.stringify(flow, null, 2))
            .then(() => {
            console.log('Text copied to clipboard');
            alert("Copied diagram as JSON!");
        }).catch(e => {
            console.log('Error', e);
            alert(e);
        });
    }
};
exports.toJson = toJson;
