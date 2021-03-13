import Axios from "axios";
import { NodeDescription } from "../../../core/NodeDescription";
import ServerNode from "../ServerNode";
import axios from 'axios';
import Feature from "../../../core/Feature";

export default class HTTPRequest extends ServerNode {
    public static category: string = 'Reader'
    public static inPorts: Array<string> = ['Input']
    public static summary = 'Make a HTTP request'

    async run() {
        console.log(this.input())

        for await (let feature of this.input()) {
            await this.request(feature).then((result) => {
                this.output(result.data.map(i => new Feature(i)))
            })
        }                
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            {
                name: 'url',
                fieldType: 'String_',
                value: 'https://jsonplaceholder.typicode.com/{{ feature.resource }}',
            },
            {
                fieldType: 'String_',
                name: 'verb',
                value: 'GET',
            },
            {
                name: 'data',
                fieldType: 'JSON_',
                value: '{}',
            },
            {
                name: 'config',
                fieldType: 'JSON_',
                value: JSON.stringify({}),
            },                                   
        )

        return description
    }

    protected request(feature: Feature) {
        if(this.getParameterValue('verb', feature) == 'GET') {
            return axios.get(
                this.getParameterValue('url', feature),
                this.getParameterValue('config')
            )
        }

        // if(this.getParameterValue('verb') == 'POST') {
        //     return axios.post(
        //         this.getParameterValue('config'),
        //         this.getParameterValue('config'),
        //         this.getParameterValue('config')
        //     )   
        // }

        // if(this.getParameterValue('verb') == 'DELETE') {
        //     return axios.delete(
        //         feature.url,
        //         feature.config
        //     )   
        // }        
    } 
}