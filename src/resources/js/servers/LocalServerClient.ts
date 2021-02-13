import AbstractServerClient from "./AbstractServerClient";
import { NodeDescription } from "../NodeDescription";

export default class LocalServerClient extends AbstractServerClient {
    sayHi() : void {
        alert("HI!")
    }

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
                                outPorts: ['Output'],
                                key: 'test-key',
                                name: 'TypeScriptTest',
                                nodeReact: 'Node',
                                parameters: [],
                                summary: 'ajthinking is learning typescript',
                            })
                        ]
                    }                    
                }
            })
        })
    }

    run() {
        return new Promise((callback) => {
            return alert("Not implemented")
            return callback({
                // data: {
                //     stories: [],
                //     capabilities: {
                //         availableNodes: []
                //     }                    
                // }
            })
        })        
    }
}