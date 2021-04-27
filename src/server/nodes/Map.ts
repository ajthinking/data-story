import Feature from "../../core/Feature";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import ServerNodeInterface from "../ServerNodeInterface";

export default class Map extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Workflow'    
    public static summary = 'Map into a property'    

    async run() {
        const property = this.getParameterValue('property');
        const paths = property.split('.')

        this.output(
            this.input().map(item => {
                let mapped = paths.reduce((carry, path) => {
                    return carry[path]
                }, item.original)

                return new Feature(mapped)
            })
        );
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            NodeParameter.make('property').withValue('data'),            
        )

        return description
    }    
}