import ServerDiagram from "./ServerDiagram";
import ServerNodeFactory from "./ServerNodeFactory";
import Cookie from '../core/utils/Cookie'
import DiagramModel from "../core/DiagramModel";
import { BootPayload } from "../core/types/BootPayload";

export default class Server
{
    public boot() {
        return new Promise<BootPayload>((callback) => {
            return callback({
                data: {
                    stories: [],
                    availableNodes: this.nodeDescriptions()                    
                }
            })
        })
    }

    public async run(diagram: DiagramModel) {
        return ServerDiagram.hydrate(diagram.serialize(), ServerNodeFactory).run()
    }

    public async save(name: string, model: DiagramModel) {

        return new Promise((success) => {

            Cookie.setObject(name, model.serialize())

            return success(true)
        })
    }

    protected nodeDescriptions(): object[] {
        return ServerNodeFactory.all().map(node => (new node()).serialize())
    }
}