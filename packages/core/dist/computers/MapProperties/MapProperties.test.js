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
const ComputerTester_1 = require("../../support/computerTester/ComputerTester");
const MapProperties_1 = require("./MapProperties");
describe('when mode is ADD', () => {
    it('maps incoming items according to the schema passed', () => __awaiter(void 0, void 0, void 0, function* () {
        const incoming = [
            {
                id: "some-id",
                person: {
                    firstname: "John",
                    age: 42
                }
            }
        ];
        const map = JSON.stringify({
            vendor_id: "id",
            properties: {
                name: "person.firstname",
                metadata: {
                    age: "person.age"
                }
            }
        });
        yield (0, ComputerTester_1.when)(MapProperties_1.MapProperties)
            .hasParams({ map })
            .getsInput(incoming)
            .doRun()
            .expectOutput([{
                id: "some-id",
                vendor_id: "some-id",
                person: {
                    firstname: "John",
                    age: 42
                },
                properties: {
                    name: "John",
                    metadata: {
                        age: 42
                    }
                }
            }])
            .ok();
    }));
});
describe('when mode is REPLACE', () => {
    it('maps incoming items according to the schema passed', () => __awaiter(void 0, void 0, void 0, function* () {
        const incoming = [
            {
                id: "some-id",
                person: {
                    firstname: "John",
                    age: 42
                }
            }
        ];
        const map = JSON.stringify({
            vendor_id: "id",
            properties: {
                name: "person.firstname",
                metadata: {
                    age: "person.age"
                }
            }
        });
        yield (0, ComputerTester_1.when)(MapProperties_1.MapProperties)
            .hasParams({ map })
            .getsInput(incoming)
            .doRun()
            .expectOutput([{
                vendor_id: "some-id",
                properties: {
                    name: "John",
                    metadata: {
                        age: 42
                    }
                }
            }])
            .ok();
    }));
});
