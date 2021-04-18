import Feature from "../../core/Feature";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class Map extends ServerNode {
    public static category: string = 'Workflow'    
    public static summary = 'Map into a property'    

    async run() {
        const property = this.getParameterValue('property');

        this.output(
            this.input().map(item => new Feature(item.original[property]))
        );
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            NodeParameter.make('property').withValue(''),            
        )

        return description
    }    
}