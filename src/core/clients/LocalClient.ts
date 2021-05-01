import Server from '../../server/Server'
import DiagramModel from '../DiagramModel';
import ClientInterface from './ClientInterface';

const server = new Server;

export default class LocalClient implements ClientInterface {
    boot(){
        return server.boot()
    }

    run(model: DiagramModel) {
        return server.run(model)
    }

    save(name: string, model: DiagramModel) {
        return server.save(name, model)
    }
}