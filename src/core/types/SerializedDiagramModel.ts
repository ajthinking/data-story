export type SerializedDiagramModel = {
	id: string,
	offsetX: number,
	offsetY: number,
	zoom: number,
	gridSize: number,
	executionOrder: string[],
	layers: any[],
	locked: boolean
}



/*

// EXAMPLE:

{
    "id": "bec67645-53d2-48b1-8be1-197b792828fc",
    "offsetX": 0,
    "offsetY": 0,
    "zoom": 100,
    "gridSize": 0,
    "links": [
        {
            "id": "2fab895a-933a-45c8-a0bf-891a009ee1a4",
            "type": "default",
            "source": "Node_CreateJSON_1_2c7f0faa-ef84-4864-a764-dfd0abbb3e5f",
            "sourcePort": "Port_Output_on_Node_CreateJSON_1_2c7f0faa-ef84-4864-a764-dfd0abbb3e5f}",
            "target": "Node_Inspect_2_7dec30a0-cd11-4bf0-8e5c-bb417aa40402",
            "targetPort": "Port_Input_on_Node_Inspect_2_7dec30a0-cd11-4bf0-8e5c-bb417aa40402}",
            "points": [
                {
                    "id": "bad7e25f-f4eb-411d-9e6f-176e18a4b56c",
                    "type": "point",
                    "x": 222.578125,
                    "y": 137.5
                },
                {
                    "id": "b83e7103-9591-4249-af65-db94d1ffac9d",
                    "type": "point",
                    "x": 305.421875,
                    "y": 137.5
                }
            ],
            "labels": [],
            "width": 3,
            "color": "gray",
            "curvyness": 50,
            "selectedColor": "rgb(0,192,255)"
        }
    ],
    "nodes": [
        {
            "id": "Node_CreateJSON_1_2c7f0faa-ef84-4864-a764-dfd0abbb3e5f",
            "type": "NodeModel",
            "x": 100,
            "y": 100,
            "ports": [
                {
                    "id": "Port_Output_on_Node_CreateJSON_1_2c7f0faa-ef84-4864-a764-dfd0abbb3e5f}",
                    "type": "default",
                    "x": 217.15625,
                    "y": 101,
                    "name": "Output",
                    "alignment": "right",
                    "parentNode": "Node_CreateJSON_1_2c7f0faa-ef84-4864-a764-dfd0abbb3e5f",
                    "links": [
                        "2fab895a-933a-45c8-a0bf-891a009ee1a4"
                    ],
                    "in": false,
                    "label": "Output",
                    "features": [
                        {
                            "original": {
                                "resource": "todos"
                            }
                        }
                    ]
                }
            ],
            "options": {
                "id": "Node_CreateJSON_1_2c7f0faa-ef84-4864-a764-dfd0abbb3e5f",
                "serial": 1,
                "category": "Reader",
                "editableInPorts": false,
                "editableOutPorts": false,
                "inPorts": [],
                "outPorts": [
                    "Output"
                ],
                "key": "test-key",
                "name": "CreateJSON",
                "nodeReact": "Node",
                "serverNodeType": "CreateJSON",
                "parameters": [
                    {
                        "fieldType": "String_",
                        "value": "CreateJSON",
                        "name": "node_name"
                    },
                    {
                        "fieldType": "JSON_",
                        "value": "[{ \"resource\": \"todos\"}]",
                        "name": "features"
                    }
                ],
                "summary": "Create features from JSON",
                "type": "NodeModel"
            }
        },
        {
            "id": "Node_Inspect_2_7dec30a0-cd11-4bf0-8e5c-bb417aa40402",
            "type": "NodeModel",
            "x": 300,
            "y": 100,
            "ports": [
                {
                    "id": "Port_Input_on_Node_Inspect_2_7dec30a0-cd11-4bf0-8e5c-bb417aa40402}",
                    "type": "default",
                    "x": 300,
                    "y": 101,
                    "name": "Input",
                    "alignment": "left",
                    "parentNode": "Node_Inspect_2_7dec30a0-cd11-4bf0-8e5c-bb417aa40402",
                    "links": [
                        "2fab895a-933a-45c8-a0bf-891a009ee1a4"
                    ],
                    "in": true,
                    "label": "Input"
                }
            ],
            "options": {
                "id": "Node_Inspect_2_7dec30a0-cd11-4bf0-8e5c-bb417aa40402",
                "serial": 2,
                "category": "Workflow",
                "editableInPorts": false,
                "editableOutPorts": false,
                "inPorts": [
                    "Input"
                ],
                "outPorts": [],
                "key": "test-key",
                "name": "Inspect",
                "nodeReact": "Node",
                "serverNodeType": "Inspect",
                "parameters": [
                    {
                        "fieldType": "String_",
                        "value": "Inspect",
                        "name": "node_name"
                    }
                ],
                "summary": "Display features in a table",
                "type": "NodeModel"
            }
        }
    ],
    "executionOrder": [
        "Node_CreateJSON_1_2c7f0faa-ef84-4864-a764-dfd0abbb3e5f",
        "Node_Inspect_2_7dec30a0-cd11-4bf0-8e5c-bb417aa40402"
    ]
}

*/