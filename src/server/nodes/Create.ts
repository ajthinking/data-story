import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import { NodeDescription } from "../../core/NodeDescription";
import Feature from "../../core/Feature";
import ServerNodeInterface from "../ServerNodeInterface";

export default class Create extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Workflow'    
    public static summary = 'Create a null feature'
    public static inPorts = []

    async run() {
        this.output([new Feature()])
    }      
}