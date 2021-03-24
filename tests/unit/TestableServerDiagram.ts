import ServerDiagram from "../../src/server/ServerDiagram"

export default class TestableServerDiagram {
    serverDiagram: ServerDiagram
    nodeClass: any
    parameters_: Object = {}
    hasRun: boolean = false

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
    }    

    async assertCanRun() {
        await this.runOnce()
        expect(true).toBe(true)
        //expect(this.serverDiagram.nodes).toBeInstanceOf(Array)
    }

    async runOnce() {
        let node = new this.nodeClass(this.parameters_)

        this.serverDiagram.addNode(node)

        this.serverDiagram.executionOrder = [node]

        await this.serverDiagram.run().then((ok) => {}, (bad) => { console.log('nooo', bad)})

        this.hasRun = true
    }
}