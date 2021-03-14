import Server from '../../server/Server'

const server = new Server;

export default class LocalClient {
    boot() {
        return server.boot()
    }

    run(model) {
        // Disconnect any ties to frontend model by only providing the serialized diagram
        return server.run(
            model.serialize()
        )
    }
}