import { SerializedPortModel } from "./SerializedPortModel";

export type SerializedNodeModel = {
    id: string,
    type: string,
    x: number,
    y: number,
    ports: SerializedPortModel[],
    options: {
        id: string,
        serial: number,
        category: string,
        editableInPorts: boolean,
        editableOutPorts: boolean,
        inPorts: string[],
        outPorts: string[],
        key: string, // what?
        name: string,
        nodeReact: string, // what?
        serverNodeType: string, // what?
        parameters: {
			fieldType: string,
			value: string,
			name: string,
		}[],
        summary: string, // what?
        type: string // what?
    }
}