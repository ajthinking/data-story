import { ItemValue } from './types/ItemValue';
import { Storage } from './types/Storage';
export declare class FileStorage implements Storage {
    private root;
    currentExecutionId: string | null;
    constructor(root: string);
    /**
     * Creates the directories we need if they doesn't exist
     */
    init(): Promise<void>;
    createExecution(): Promise<void>;
    /**
     * Store items as pretty JSON
     */
    putExecutionItems(key: string, items: ItemValue): Promise<void>;
    serialize(): Promise<{
        root: string;
        currentExecutionId: string | null;
        items: {
            [key: string]: ItemValue;
        };
    }>;
    put(filename: string, content: string): Promise<void>;
}
