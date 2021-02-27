import { NodeDescription } from "../../../core/NodeDescription";
import ServerNode from "../ServerNode";

export default class API extends ServerNode {
    public static inPorts: Array<String> = []

    run() {
        this.output([]);
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            {
                default: '',
                fieldType: 'Number',
                name: 'endpoint',
                value: '',
            }
        )

        return description
    }    
}