import Feature from "../../core/Feature";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import ServerNodeInterface from "../ServerNodeInterface";

export default class Flatten extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Workflow'    
    public static summary = 'Flatten arrays'    

    async run() {
        this.output(
            this.input().map(item => item.original).flat().map(item => new Feature(item))
        );
    }
}