import ServerNode from "../ServerNode";
import {saveAs} from 'file-saver';
import NodeParameter from "../../core/NodeParameter";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNodeInterface from "../ServerNodeInterface";

export default class DownloadJSON extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Workflow'    
    public static summary = 'Download features as JSON'
    public static outPorts = []

    async run() {
        const filename = this.getParameterValue('filename')
        const indentation = 4 //this.getParameterValue('pretty') ? 4 : 0;
        const json = JSON.stringify(this.input().map(f => f.original), null, indentation)
        // @ts-ignore: By adding 'dom' to tsconfig lib Blob IS accessible here
        var blob = new Blob([json], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            NodeParameter.make('filename').withValue('data.json'),
            //NodeParameter.make('pretty').withFieldType('Boolean_').withValue(true)
        )

        return description
    }      
}