export default class ServerNode {
    id: string

    static hydrate(data) {
        let instance = new this()

        for (const [key, value] of Object.entries(data)) {
            instance[key] = value
        }        

        return instance
    }
}