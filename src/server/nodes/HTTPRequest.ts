import ServerNode from "../ServerNode";
import axios from 'axios';
import Feature from "../../core/Feature";
import NodeParameter from "../../core/NodeParameter";

export default class HTTPRequest extends ServerNode {
    category: string = 'Reader'
    inPorts: string[] = ['Input']
    outPorts: string[] = ['Features', 'Response', 'Failed'];
    summary = 'Make a HTTP request'
	name = 'HTTPRequest'

    async run() {
        for await (let feature of this.input()) {
            await this.request(feature)
				.then((result) => {
					this.output([new Feature(result)], 'Response')

					if(this.getParameterValue('features_path')) {
						const features_path = this.getParameterValue('features_path')
						const raw = features_path.split('.').reduce((traversed, part) => {
							return traversed[part]
						}, result)

						const wrapped = [raw].flat();
						this.output(wrapped.map(r => new Feature(r)), 'Features')
					}
            	}).catch((reason) => {
					if(reason) {
						this.output(
							// Prevent functions in data
							[new Feature(JSON.parse(JSON.stringify(reason)))],
							'Failed'
						)
					}					
				})
        }                
    }

	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('url').withValue('https://jsonplaceholder.cypress.io/{{ feature.resource }}'),
            NodeParameter.string('verb').withValue('GET'),
            NodeParameter.json('data').withValue('{}'),
            NodeParameter.json('config').withValue('{}'),
			NodeParameter.string('features_path').withValue('data'),
		]
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