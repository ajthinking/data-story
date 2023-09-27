import { Node } from "./types/Node";
export declare class NodeRunError extends Error {
    constructor({ message, node }: {
        message: string;
        node: Node;
    });
}
