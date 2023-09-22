import { Diagram } from "../Diagram";
import { NodeDescription } from "../types/NodeDescription";
export declare class LinkGuesser {
    diagram: Diagram;
    constructor(diagram: Diagram);
    guess(nodeDescription: NodeDescription): {
        x: number;
        y: number;
    };
}
