import Feature from "../../core/Feature";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class Map extends ServerNode {
    category: string = 'Workflow'    
    summary = 'Map into a property'
	name = 'Map'    

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

    serialize() {
        let description = super.serialize()

        description.parameters.push(
            NodeParameter.make('property').withValue('data'),            
        )

        return description
    }    
}