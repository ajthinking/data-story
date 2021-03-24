import ServerDiagram from "../../src/server/ServerDiagram"

export default class TestableServerNode {
    serverDiagram: ServerDiagram
    name: string
    parameters_: Object = {}
    hasRun: boolean = false

    constructor(name: string) {
        // UNCOMMENT THIS TO GET ERROR TypeError: Class extends value undefined is not a constructor or null
        //this.serverDiagram = new ServerDiagram
    }

    parameters(parameters = {}) {
        this.parameters_ = parameters
    }    

    assertNameIsSet() {
        this.runOnce()

        expect(this.name).toBeInstanceOf(String)
    }

    runOnce() {
        this.hasRun = true
    }
}