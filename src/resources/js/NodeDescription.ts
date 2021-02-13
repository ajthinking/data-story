export class NodeDescription {
    public category: string
    public editableInPorts: boolean
    public editableOutPorts: boolean
    public inPorts: Array<String>
    public outPorts: Array<String>
    public key: string
    public name: string
    public nodeReact: string
    public parameters: Array<any>
    public summary: string

    static deserialize(data: object) {
        let instance = new this;

        for (const [key, value] of Object.entries(data)) {
            this[key] = value
        }

        return instance
    }
}

