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
const computers_1 = require("./computers");
const deriveFrom_1 = require("./deriveFrom");
it('returns a new config', () => __awaiter(void 0, void 0, void 0, function* () {
    const config = (0, deriveFrom_1.deriveFrom)(computers_1.Ignore, {
        name: 'IgnoreDerivation',
        params: {
            name: 'IgnoreDerivation',
        }
    });
    expect(config).toMatchObject({
        name: 'IgnoreDerivation',
    });
}));
