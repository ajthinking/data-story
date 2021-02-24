import { NodeDescription } from "../../core/NodeDescription";
import { inject, observer } from "mobx-react"
import ServerDiagram from "./ServerDiagram";
import Create from "./nodes/Create";

export default class Server
{
    public boot() {
        return new Promise((callback) => {
            return callback({
                data: {
                    stories: [],
                    capabilities: {
                        availableNodes: this.nodeDescriptions()
                    }                    
                }
            })
        })
    }

    public run(diagram) {
        return new Promise((callback) => {
            return callback({
                data: {
                    diagram: ServerDiagram.hydrate(diagram).run()
                } 
            })
        }) 
    }

    protected nodeDescriptions() {
        console.log("hi")
        return [
            Create.describe()
        ]
    }
}