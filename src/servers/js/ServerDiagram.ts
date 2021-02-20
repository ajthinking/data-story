import ServerNode from './ServerNode'

export default class ServerDiagram {
    executionOrder: Array<any>
    links: Array<any>
    nodes: Array<any>
 
    static deserialize(data) {
        let instance = new this()

        for (const [key, value] of Object.entries(data)) {
            instance[key] = value
        }

        return instance
    }

    run() {
        for(const id of this.executionOrder) {
            this.find(id) //.run()
        }

        return this
    }

    find(id: string) {
        return this.nodes.concat(this.links).find(entity => entity.id == id)
    }
}