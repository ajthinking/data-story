import { Diagram } from "../Diagram";
import { Link } from "../types/Link";
import { Node } from "../types/Node";
export declare class LinkGuesser {
    diagram: Diagram;
    constructor(diagram: Diagram);
    guess(node: Node): Link | null;
}
