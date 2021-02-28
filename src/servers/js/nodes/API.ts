import Axios from "axios";
import { NodeDescription } from "../../../core/NodeDescription";
import ServerNode from "../ServerNode";
import axios from 'axios';

export default class API extends ServerNode {
    public static inPorts: Array<String> = []

    async run() {
        await axios.get(
            this.getParameter('endpoint').value
        ).then(response => {
            this.output(
                Array.isArray(response.data) ? response.data : [response.data]
            )
        })

        return new Promise(resolve => resolve('Node finished'))        
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            {
                default: 'https://jsonplaceholder.typicode.com/todos',
                fieldType: 'String_',
                name: 'endpoint',
                value: 'https://jsonplaceholder.typicode.com/todos',
            }
        )

        return description
    }    
}