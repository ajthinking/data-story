import Axios from "axios";
import { NodeDescription } from "../../../core/NodeDescription";
import ServerNode from "../ServerNode";
import axios from 'axios';

export default class HTTPRequest extends ServerNode {
    public static category: string = 'Reader'
    public static inPorts: Array<string> = ['Input']
    public static summary = 'Make a HTTP request'

    async run() {
        let output = [];

        for await (let feature of this.input()) {
            let result = await this.request(feature)
            output.push(result);
        }        

        this.output(output)
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            {
                name: 'url',
                fieldType: 'String_',
                default: 'https://jsonplaceholder.typicode.com/todos',
                value: 'https://jsonplaceholder.typicode.com/todos',
            },
            {
                default: 'GET',
                fieldType: 'String_',
                name: 'verb',
                value: 'GET',
            },
            {
                name: 'data',
                fieldType: 'JSON_',
                default: '{}',
                value: '{}',
            },
            {
                name: 'config',
                fieldType: 'JSON_',
                default: JSON.stringify({}),
                value: JSON.stringify({}),
            },                                   
        )

        return description
    }

    protected request(feature) {
        if(feature.verb == 'GET') {
            return axios.get(
                feature.url,
                feature.config
            )
        }

        if(feature.verb == 'POST') {
            return axios.post(
                feature.url,
                feature.data,
                feature.config
            )   
        }

        if(feature.verb == 'DELETE') {
            return axios.delete(
                feature.url,
                feature.config
            )   
        }        
    } 
}