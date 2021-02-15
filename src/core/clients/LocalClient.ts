import { NodeDescription } from "../NodeDescription";
import Server from '../../servers/js/Server'

export default class LocalClient {
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

    run(model) {
        return new Promise((callback) => {
            // Use the local javascript server here
            // What is a diagram?
            // Representations?
            // Drawable
            // Executable
            // Storable
            // Encodable
            // Decodable

            let server = new Server

            server.run(model)

            return callback({
                diagram: {
                    //                    
                }
            })
        })        
    }
}