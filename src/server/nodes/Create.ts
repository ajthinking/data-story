import ServerNode from "../ServerNode";
import Feature from "../../core/Feature";

export default class Create extends ServerNode {
    public category: string = 'Workflow'
    public summary = 'Create a null feature'
    public inPorts = []
	name = 'Create'


    async run() {
        this.output([new Feature()])
    }      
}