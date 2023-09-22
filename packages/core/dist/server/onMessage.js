"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessage = void 0;
const messageHandlers_1 = require("./messageHandlers");
const onMessage = (ws, message, app) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = JSON.parse(message.toString());
    const handlers = {
        describe: messageHandlers_1.describe,
        open: messageHandlers_1.open,
        save: messageHandlers_1.save,
        run: messageHandlers_1.run,
    };
    const handler = handlers[parsed.type];
    if (!handler)
        throw ("Unknown message type: " + parsed.type);
    yield handler(ws, parsed, app);
});
exports.onMessage = onMessage;
