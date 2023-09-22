"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComputerTester_1 = require("../../support/computerTester/ComputerTester");
const Sample_1 = require("./Sample");
it('samples every nth item', () => {
    (0, ComputerTester_1.when)(Sample_1.Sample)
        .hasParams({ sample_rate: 3 })
        .getsInput([
        { id: 'a' },
        { id: 'b' },
        { id: 'c' },
        { id: 'd' },
        { id: 'e' },
        { id: 'f' },
    ])
        .doRun(6)
        .expectOutputs({
        sampled: [
            { id: 'a' },
            { id: 'd' },
        ],
        not_sampled: [
            { id: 'b' },
            { id: 'c' },
            { id: 'e' },
            { id: 'f' },
        ],
    })
        .ok();
});
