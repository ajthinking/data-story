import Feature from "../../core/Feature";
import ServerNode from "../ServerNode";

export default class Flatten extends ServerNode {
    category: string = 'Workflow'    
    summary = 'Flatten arrays'
	name = 'Flatten'

    async run() {
        this.output(
            this.input().map(item => item.original).flat().map(item => new Feature(item))
        );
    }
}