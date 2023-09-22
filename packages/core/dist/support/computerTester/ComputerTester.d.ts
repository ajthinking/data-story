import { Computer } from '../../types/Computer';
import { Diagram } from '../../Diagram';
import { ItemValue } from '../../types/ItemValue';
import { Node } from '../../types/Node';
import { OutputDevice } from '../../OutputDevice';
import { ParamsDevice } from '../../types/ParamsDevice';
import { TestStep } from './TestStep';
import { ExecutionMemory } from '../../ExecutionMemory';
import { InputDeviceInterface } from '../../types/InputDeviceInterface';
import { InputDevice } from '../../InputDevice';
import { ComputerConfig } from '../../types/ComputerConfig';
export declare const when: (computerConfig: ComputerConfig) => ComputerTester;
export type ExpectedOutputItems = {
    [key: string]: ItemValue[];
};
export type InputValues = {
    [key: string]: ItemValue[];
};
export type ExplicitParamValues = {
    [key: string]: any;
};
type TestStepArgs = any[];
export declare class ComputerTester {
    diagram: Diagram | null;
    node: Node | null;
    explicitParams: ExplicitParamValues;
    steps: [TestStep, TestStepArgs][];
    inputs: {
        [key: string]: ItemValue[];
    };
    expectedOutputs: {
        [key: string]: ItemValue[];
    };
    runner: AsyncGenerator | null;
    inputDevice: InputDeviceInterface | null;
    outputDevice: OutputDevice | null;
    memory: ExecutionMemory | null;
    expectedErrorMessage: string | undefined;
    computer: Computer;
    constructor(computerConfig: ComputerConfig);
    /**
     * After all steps have been registered, call this method to perform them 💫
     */
    ok(): Promise<void>;
    doRun(times?: number): this;
    hasDefaultParams(): this;
    hasParams(params: ExplicitParamValues): this;
    getsInput(input: ItemValue): this;
    getsInputs(inputs: InputValues): this;
    expectDone(): this;
    expectError(message: string): this;
    expectOutput(output: ItemValue): this;
    expectOutputs(outputs: ExpectedOutputItems): this;
    protected makeDiagram(): Diagram;
    protected makeInputDevice(): InputDevice;
    protected makeOutputDevice(): OutputDevice;
    protected makeParamsDevice(): ParamsDevice;
    protected makeExecutionMemory(): ExecutionMemory;
}
export {};
