import ServerNode from "../ServerNode";
import {saveAs} from 'file-saver';
import NodeParameter from "../../core/NodeParameter";

export default class DownloadJSON extends ServerNode {
    public category: string = 'Workflow'    
    public summary = 'Download features as JSON'
    public outPorts = []
	name = 'DownloadJSON'

    async run() {
        const filename = this.getParameterValue('filename')
        const indentation = 4 //this.getParameterValue('pretty') ? 4 : 0;
        const json = JSON.stringify(this.input().map(f => f.original), null, indentation)
        // @ts-ignore: By adding 'dom' to tsconfig lib Blob IS accessible here
        var blob = new Blob([json], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('filename').withValue('data.json'),
		]
	}		
}