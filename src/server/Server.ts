import ServerDiagram from "./ServerDiagram";
import ServerNodeFactory from "./ServerNodeFactory";
import Cookie from '../core/utils/Cookie'

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

    public async save(name, stringifiedModel) {
        return new Promise((success) => {
            //implement by cookie here
            
            Cookie.set(name, stringifiedModel)

            return success(true)
        })
    }

    protected nodeDescriptions() {
        return ServerNodeFactory.all().map(node => node.describe())
    }
}