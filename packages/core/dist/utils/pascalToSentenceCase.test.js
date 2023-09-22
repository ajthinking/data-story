"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pascalToSentenceCase_1 = require("./pascalToSentenceCase");
it('works for InputDevice', () => {
    const output = (0, pascalToSentenceCase_1.pascalToSentenceCase)('InputDevice');
    expect(output).toEqual('Input Device');
});
it('separates uppercase chars next to eachother', () => {
    const output = (0, pascalToSentenceCase_1.pascalToSentenceCase)('OutputJSON');
    expect(output).toEqual('Output J S O N');
});
