import Feature from "../../core/Feature";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class CreateAttribute extends ServerNode {
    public static category: string = 'Workflow'    
    public static summary = 'Create a new attribute from an expression'    

    async run() {
        // let gridSizeX = parseInt(this.getParameterValue('grid_size_x'))

        this.output(
            this.input()
        );       
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            NodeParameter.make('attribute').withValue(''),
            NodeParameter.make('expression').withValue(''),                                   
        )

        return description
    }    
}