import Axios from "axios";
import { NodeDescription } from "../../../core/NodeDescription";
import ServerNode from "../ServerNode";
import axios from 'axios';

export default class HTTPRequest extends ServerNode {
    public static category: string = 'Reader'
    public static inPorts: Array<string> = ['Input']
    public static summary = 'Make a HTTP request'

    async run() {
        await this.request().then(response => {
            this.output(
                Array.isArray(response.data) ? response.data : [response.data]
            )
        })
    }

    async runOne(feature) {
        //        
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

    protected request() {
        let type = this.getParameter('verb').value

        if(type == 'GET') {
            return axios.get(
                this.getUrl(),
                this.getConfig()
            )   
        }

        if(type == 'POST') {
            return axios.post(
                this.getUrl(),
                this.getData(),
                this.getConfig()
            )   
        }

        if(type == 'DELETE') {
            return axios.delete(
                this.getUrl(),
                this.getConfig()
            )   
        }        
    }

    protected getUrl() {
        return this.getParameterValue('url')
    }

    protected getData() {
        return JSON.parse(this.getParameter('data').value)
    }
    
    protected getConfig() {
        return JSON.parse(this.getParameter('config').value)
    }    
}