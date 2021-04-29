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
        key: string,
        name: string,
        nodeReact: string,
        serverNodeType: string,
        parameters: {
			fieldType: string,
			value: string,
			name: string,
		}[],
        summary: string,
        type: string
    }
}

/*
{
    "id": "Node_Create_1_398f2de8-e605-4ba8-81af-05eb4123f3aa",
    "type": "NodeModel",
    "x": 100,
    "y": 100,
    "ports": [
        {
            "id": "Port_Output_on_Node_Create_1_398f2de8-e605-4ba8-81af-05eb4123f3aa}",
            "type": "default",
            "x": 100,
            "y": 100,
            "name": "Output",
            "alignment": "right",
            "parentNode": "Node_Create_1_398f2de8-e605-4ba8-81af-05eb4123f3aa",
            "links": [],
            "in": false,
            "label": "Output"
        }
    ],
    "options": {
        "id": "Node_Create_1_398f2de8-e605-4ba8-81af-05eb4123f3aa",
        "serial": 1,
        "category": "Workflow",
        "editableInPorts": false,
        "editableOutPorts": false,
        "inPorts": [],
        "outPorts": [
            "Output"
        ],
        "key": "test-key",
        "name": "Create",
        "nodeReact": "Node",
        "serverNodeType": "Create",
        "parameters": [
            {
                "fieldType": "String_",
                "value": "Create",
                "name": "node_name"
            }
        ],
        "summary": "Create a null feature",
        "type": "NodeModel"
    }
}
*/