export default class ServerDiagram {
    originalData: any;

    static deserialize(data) {
        let instance = new this()
        instance.originalData = data

        return instance
    }

    run() {
        return this.originalData   
    }
}