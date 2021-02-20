import { NodeDescription } from "../../core/NodeDescription";
import { inject, observer } from "mobx-react"

export default class Server
{
    boot() {
        return new Promise((callback) => {
            return callback({
                data: {
                    stories: [],
                    capabilities: {
                        availableNodes: [
                            NodeDescription.deserialize({
                                category: 'Fake',
                                editableInPorts: false,
                                editableOutPorts: false,
                                inPorts: [],
                                outPorts: ['Output'],
                                key: 'test-key',
                                name: 'TypeScriptTest',
                                nodeReact: 'Node',
                                parameters: [
                                    {
                                        default: "TypeScriptTest",
                                        fieldType: "String_",
                                        name: "node_name",
                                        placeholder: "",
                                        value: "TypeScriptTest",
                                    }
                                ],
                                summary: 'ajthinking is learning typescript',
                            })
                        ]
                    }                    
                }
            })
        })
    }

    run(diagram) {
        console.log(diagram)

        return new Promise((callback) => {
            return callback({
                data: {
                    diagram
                } 
            })
        }) 
    }
}