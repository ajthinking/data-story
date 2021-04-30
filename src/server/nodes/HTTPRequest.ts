import ServerNode from "../ServerNode";
import axios from 'axios';
import Feature from "../../core/Feature";
import NodeParameter from "../../core/NodeParameter";

export default class HTTPRequest extends ServerNode {
    category: string = 'Reader'
    inPorts: string[] = ['Input']
    outPorts: string[] = ['Response', 'Failed'];
    summary = 'Make a HTTP request'
	name = 'HTTPRequest'

    async run() {
        for await (let feature of this.input()) {
            await this.request(feature).then((result) => {
                if(result) {
                    this.output([new Feature(result)], 'Response')
                }
            })
        }                
    }

    serialize() {
        let description = super.serialize()

        description.parameters.push(
            NodeParameter.make('url').withValue('https://jsonplaceholder.cypress.io/{{ feature.resource }}'),
            NodeParameter.make('verb').withValue('GET'),
            NodeParameter.make('data').withFieldType("JSON_").withValue('{}'),
            NodeParameter.make('config').withFieldType("JSON_").withValue('{}'),
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

        if(this.getParameterValue('verb') == 'POST') {
            return axios.post(
                this.getParameterValue('url', feature),
                this.getParameterValue('data'),
                this.getParameterValue('config')
            )   
        }

        if(this.getParameterValue('verb') == 'DELETE') {
            return axios.delete(
                this.getParameterValue('url', feature),
                JSON.parse(this.getParameterValue('config'))
            )   
        }        
    } 
}