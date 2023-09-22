import { ItemValue } from './types/ItemValue';
import { Storage } from './types/Storage';
export declare class NullStorage implements Storage {
    currentExecutionId: string;
    init(): Promise<void>;
    createExecution(): Promise<void>;
    putExecutionItems(key: string, items: ItemValue): Promise<void>;
}
