import Server from '../../server/Server'
import ClientInterface from './ClientInterface';

const server = new Server;

export default class LocalClient implements ClientInterface {
    boot() {
        return server.boot()
    }

    run(model) {
        // Disconnect any ties to frontend model by only providing the serialized diagram
        return server.run(
            model.serialize()
        )
    }

    save(name, model) {
        alert('hey im saving')
        return server.save(name, model)
    }
}