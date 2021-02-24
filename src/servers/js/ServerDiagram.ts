
import ServerNodeFactory from './ServerNodeFactory'

export default class ServerDiagram {
    executionOrder: Array<any>
    links: Array<any>
    nodes: Array<any>
 
    static hydrate(data) {
        let instance = new this()

        for (const [key, value] of Object.entries(data)) {
            
            // hydratables
            if(key === 'nodes') {
                instance.nodes = data.nodes.map(node => {
                    return ServerNodeFactory.hydrate(node, instance)
                })
                
                continue
            }
            
            // primitive properties
            instance[key] = value
        }

        return instance
    }

    run() {
        for(const id of this.executionOrder) {
            this.find(id).run()
        }

        return this
    }

    find(id: string) {
        let searchables = this.nodes
            .concat(this.nodes.map(node => node.ports).flat())
            .concat(this.links)

        return searchables.find(entity => entity.id == id)
    }
}