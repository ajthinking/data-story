import { NodeDescription } from "../../../core/NodeDescription";
import ServerNode from "../ServerNode";

export default class Create extends ServerNode {
    public static inPorts: Array<String> = []
    public static summary = 'Create a sequence of objects'    

    async run() {
        let count = parseInt(this.getParameter('number_of_features_to_create').value)
        
        this.output(
            Array.from(Array(count).keys()).map(i => {
                return { creation_id: i}
            })
        );

        return new Promise((resolve, reject) => {
            resolve('Node finished')
        })        
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            {
                default: 10,
                fieldType: "Number",
                name: "number_of_features_to_create",
                value: 10,
            }            
        )

        return description
    }    
}