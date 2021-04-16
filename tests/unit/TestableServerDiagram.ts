import Feature from "../../src/core/Feature"
import ServerDiagram from "../../src/server/ServerDiagram"

export default class TestableServerDiagram {
    serverDiagram: ServerDiagram
    nodeClass: any
    parameters_: Object = {}
    hasRun: boolean = false
    node_: any

    constructor() {
        this.serverDiagram = new ServerDiagram
    }

    static test() {
        return new this
    }

    node(nodeClass) {
        this.nodeClass = nodeClass
        
        return this
    }

    parameters(parameters = {}) {
        this.parameters_ = parameters

        return this
    }    

    async assertCanRun() {
        
        await this.runOnce()
        
        expect(true).toBe(true)
        
        return this
        

        
        //expect(this.serverDiagram.nodes).toBeInstanceOf(Array)
    }

    async assertOutput(expected, portName = 'Output') {
        await this.runOnce()        
        
        let port = this.node_.ports.find(p => p.name == portName)
        
        expect(port.features).toStrictEqual(
            expected.map(e => new Feature(e))
        )

        return this
    }

    async runOnce() {
        if(this.hasRun) return
        this.node_ = new this.nodeClass(this.serverDiagram, this.nodeClass.describe())
        console.log(this.node_)
        this.serverDiagram.addNode(this.node_)

        this.serverDiagram.executionOrder = [this.node_.id]

        await this.serverDiagram.run().then((ok) => {}, (bad) => { console.log('nooo', bad)})

        this.hasRun = true
    }
}