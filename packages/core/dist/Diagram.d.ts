import { PortId } from './types/PortId';
import { Link } from './types/Link';
import { Node } from './types/Node';
export declare class Diagram {
    nodes: Node[];
    links: Link[];
    viewport: {
        x: number;
        y: number;
        zoom: number;
    };
    constructor(nodes: Node[], links: Link[]);
    linksConnectedToPortId(id: PortId | undefined): Link[];
    nodeWithInputPortId(portId: PortId): Node | undefined;
    nodeWithOutputPortId(portId: PortId): Node | undefined;
    linksAtInput(node: Node, name: string): Link[];
    linksAtOutput(node: Node, name: string): Link[];
    directAncestor(node: Node): Node[];
    directDescendant(node: Node): Node[];
}
