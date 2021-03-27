export default class ServerDiagram {
    executionOrder: Array<any>
    links: Array<any> = []
    nodes: Array<any> = []
 
    static hydrate(data, factory) {
        let instance = new this()
        console.log('hey')
        for (const [key, value] of Object.entries(data)) {
            
            // hydratables
            if(key === 'nodes') {
                instance.nodes = data.nodes.map(node => {
                    return factory.hydrate(node, instance)
                })
                
                continue
            }
            
            // primitive properties
            instance[key] = value
        }

        return instance
    }

    async run() {
        for await (let nodeId of this.executionOrder) {
            await this.find(nodeId).run()
        }
        
        return new Promise((callback) => {
            return callback({
                data: {
                    diagram: this
                } 
            })
        })
    }

    find(id: string) {
        let searchables = this.nodes
            .concat(this.nodes.map(node => node.ports).flat())
            .concat(this.links)

        return searchables.find(entity => entity.id == id)
    }

    addNode(node) {
        this.nodes.push(node)

        return this
    }     
}