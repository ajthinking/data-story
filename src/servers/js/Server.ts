import ServerDiagram from "./ServerDiagram";
import ServerNodeFactory from "./ServerNodeFactory";

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
        return ServerNodeFactory.all().map(node => node.describe())
    }
}