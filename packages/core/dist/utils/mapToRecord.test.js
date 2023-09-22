"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapToRecord_1 = require("./mapToRecord");
it('converts a map to a record', () => {
    const map = new Map()
        .set('a', 1);
    const record = (0, mapToRecord_1.mapToRecord)(map);
    expect(record).toMatchObject({
        a: 1
    });
});
