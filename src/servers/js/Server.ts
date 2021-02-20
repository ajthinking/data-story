import { NodeDescription } from "../../core/NodeDescription";
import { inject, observer } from "mobx-react"
import ServerDiagram from "./ServerDiagram";

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
                                name: 'Create',
                                nodeReact: 'Node',
                                serverNodeType: 'Create',
                                parameters: [
                                    {
                                        default: "Create",
                                        fieldType: "String_",
                                        name: "node_name",
                                        placeholder: "",
                                        value: "Create",
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
        return new Promise((callback) => {
            return callback({
                data: {
                    diagram: ServerDiagram.hydrate(diagram).run()
                } 
            })
        }) 
    }
}