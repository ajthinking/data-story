import ServerNode from "../ServerNode";
import ServerNodeInterface from "../ServerNodeInterface";

export default class Inspect extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Workflow'
    public features: any[]
    public static summary = 'Display features in a table'    

    public static outPorts: string[] = []

    async run() {
        this.features = this.input();
    }
}