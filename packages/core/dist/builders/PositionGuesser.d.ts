import { Diagram } from "../Diagram";
import { Node } from "../types/Node";
import { NodeDescription } from "../types/NodeDescription";
export declare class PositionGuesser {
    diagram: Diagram;
    constructor(diagram: Diagram);
    guess(node: Node | NodeDescription): {
        x: number;
        y: number;
    };
}
