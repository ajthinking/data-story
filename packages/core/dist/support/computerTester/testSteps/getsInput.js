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
exports.getsInput = void 0;
exports.getsInput = {
    handle(tester, itemsAtInputPort) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const portName = 'input';
            const port = tester.node.inputs.find((p) => p.name === portName);
            const link = tester.diagram.linksConnectedToPortId(port.id)[0];
            (_a = tester.inputDevice) === null || _a === void 0 ? void 0 : _a.setItemsAt(link.id, itemsAtInputPort);
        });
    }
};
