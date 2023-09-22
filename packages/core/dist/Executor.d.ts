import { Node } from './types/Node';
import { Diagram } from './Diagram';
import { OutputDevice } from './OutputDevice';
import { Computer } from './types/Computer';
import { ExecutionUpdate } from './types/ExecutionUpdate';
import { ParamsDevice } from './types/ParamsDevice';
import { Storage } from './types/Storage';
import { ExecutionMemory } from './ExecutionMemory';
import { ExecutorInterface } from './types/ExecutorInterface';
import { InputDevice } from './InputDevice';
export type NodeStatus = 'AVAILABLE' | 'BUSY' | 'COMPLETE';
export declare class Executor implements ExecutorInterface {
    diagram: Diagram;
    computers: Map<string, Computer>;
    storage: Storage;
    memory: ExecutionMemory;
    constructor(diagram: Diagram, computers: Map<string, Computer>, storage: Storage);
    protected boot(): void;
    execute(): AsyncGenerator<ExecutionUpdate, void, void>;
    protected isComplete(): boolean;
    protected clearFinishedPromises(promises: Promise<void>[]): Promise<Promise<void>[]>;
    protected getRunnableNodes(): Node[];
    protected canRunNodeDefault(node: Node): boolean;
    protected makeInputDevice(node: Node, memory: ExecutionMemory): InputDevice;
    protected makeOutputDevice(node: Node, memory: ExecutionMemory): OutputDevice;
    protected makeParamsDevice(computer: Computer, node: Node): ParamsDevice;
    /**
     * Marks nodes as complete if some default heuristics are met.
     */
    protected attemptToMarkNodeComplete(node: Node): void;
}
