export class NodeDescription {
    category: string
    editableInPorts: boolean
    editableOutPorts: boolean
    inPorts: Array<String>
    outPorts: Array<String>
    key: string
    name: string
    nodeReact: string

    parameters: Array<any>
    summary: string

    static deserialize(data: object) {
        let instance = new this;

        for (const [key, value] of Object.entries(data)) {
            this[key] = value
        }

        return instance
    }
}

