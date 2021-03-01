import Axios from "axios";
import { NodeDescription } from "../../../core/NodeDescription";
import ServerNode from "../ServerNode";
import axios from 'axios';

export default class API extends ServerNode {
    public static inPorts: Array<String> = []

    async run() {
        await this.request().then(response => {
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
                name: 'url',
                fieldType: 'String_',
                default: 'https://api.github.com/users/ajthinking/repos',
                value: 'https://api.github.com/users/ajthinking/repos',
            },
            {
                default: 'GET',
                fieldType: 'String_',
                name: 'verb',
                value: 'GET',
            },
            {
                name: 'data',
                fieldType: 'String_',
                default: '{}',
                value: '{}',
            },
            {
                name: 'config',
                fieldType: 'String_',
                default: JSON.stringify({headers: {Authorization: 'token xxxxxx'}}),
                value: JSON.stringify({headers: {Authorization: 'token xxxxxx'}}),
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
        return this.getParameter('url').value
    }

    protected getData() {
        return JSON.parse(this.getParameter('data').value)
    }
    
    protected getConfig() {
        return JSON.parse(this.getParameter('config').value)
    }    
}