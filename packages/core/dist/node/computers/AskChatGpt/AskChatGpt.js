"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AskChatGpt = void 0;
const openai_1 = require("openai");
const ParamBuilder_1 = require("../../../ParamBuilder");
exports.AskChatGpt = {
    name: 'AskChatGpt',
    inputs: ['input'],
    outputs: ['completions'],
    params: {
        prompt: (0, ParamBuilder_1.string)('prompt').value('What is the meaning of life?').get(),
    },
    category: 'API',
    run({ input, output }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            const openai = new openai_1.OpenAIApi(new openai_1.Configuration({
                apiKey: process.env.OPEN_AI_SECRET,
            }));
            while (true) {
                const [{ params: { prompt } }] = input.pull(1);
                const completion = yield __await(openai.createCompletion({
                    model: "text-davinci-003",
                    prompt,
                    temperature: 0,
                    max_tokens: 500,
                    top_p: 1,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                }));
                output.pushTo('completions', completion.data.choices);
                yield yield __await(void 0);
            }
        });
    },
};
