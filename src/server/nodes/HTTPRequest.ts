import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import axios from 'axios';
import Feature from "../../core/Feature";
import NodeParameter from "../../core/NodeParameter";

export default class HTTPRequest extends ServerNode {
    public static category: string = 'Reader'
    public static inPorts: string[] = ['Input']
    public static outPorts: string[] = ['Data', 'Response'];
    public static summary = 'Make a HTTP request'

    async run() {
        for await (let feature of this.input()) {
            await this.request(feature).then((result) => {
                if(result) {
                    this.output([new Feature(result)], 'Response')
                }

                if(result && result.data) {
                    this.output(result.data.map(i => new Feature(i)), 'Data')
                }
            })
        }                
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            NodeParameter.make('url').withValue('https://jsonplaceholder.typicode.com/{{ feature.resource }}'),
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