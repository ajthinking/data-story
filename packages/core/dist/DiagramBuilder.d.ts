import { Diagram } from './Diagram';
import { Node } from './types/Node';
import { Port, PortName } from './types/Port';
import { ComputerConfig } from './types/ComputerConfig';
export declare class DiagramBuilder {
    diagram: Diagram;
    previousNode: Node | null;
    fromDirective: PortName | null;
    toDirective: PortName | null;
    constructor();
    from(directive: string): this;
    on(directive: string): this;
    to(directive: string): this;
    add(config: ComputerConfig, params?: Record<string, any>): this;
    get(): Diagram;
    protected getScopedId(computerName: string): number;
    protected link(newNode: Node): void;
    protected getPortToLinkTo(): Port | undefined;
}
