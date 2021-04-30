import Feature from "../../src/core/Feature"
import ServerDiagram from "../../src/server/ServerDiagram"
import ServerNode from "../../src/server/ServerNode"

export default class TestableServerDiagram {
    serverDiagram: ServerDiagram
    nodeClass: any
    parameters_: Object = {}
    hasRun: boolean = false
    node_: ServerNode
    inputs_: Object[] = []

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

    input(obj: Object, port = 'Input') {
        this.inputs_ = [obj]

        return this
    }

    inputs(inputs: Object[], port = 'Input') {
        this.inputs_ = inputs

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

        // Overwrite default parameters
        for (const [name, value] of Object.entries(this.parameters_)) {
            let selected = this.node_.options.parameters.find(p => p.name == name)
            selected.value = value
        } 

        this.serverDiagram.addNode(this.node_)

        this.serverDiagram.executionOrder = [this.node_.id]

        //await this.serverDiagram.run().then((ok) => {}, (bad) => { console.log('nooo', bad)})

        this.hasRun = true
    }
}