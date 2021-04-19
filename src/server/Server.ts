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

    public async run(diagram) {
        return ServerDiagram.hydrate(diagram, ServerNodeFactory).run()
    }

    public async save(name, model) {
        return new Promise(() => {
            //implement by cookie here
        })
    }

    protected nodeDescriptions() {
        return ServerNodeFactory.all().map(node => node.describe())
    }
}