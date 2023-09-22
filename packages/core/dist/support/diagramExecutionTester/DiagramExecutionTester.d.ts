import { Diagram } from '../../Diagram';
import { NullStorage } from '../../NullStorage';
export declare const whenRunning: (diagram: Diagram) => DiagramExecutionTester;
export declare class DiagramExecutionTester {
    diagram: Diagram;
    shouldExpectSuccess: boolean;
    shouldExpectFailMessage: string | undefined;
    constructor(diagram: Diagram);
    ok(): Promise<void>;
    expectFail(message?: string): this;
    expectSuccess(): this;
    protected makeStorage(): Promise<NullStorage>;
}
