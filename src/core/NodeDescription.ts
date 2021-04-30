export class NodeDescription {
    public category: string
    public editableInPorts: boolean
    public editableOutPorts: boolean
    public inPorts: string[]
    public outPorts: string[]
    public key: string
    name: string
    public serverNode: string
    public nodeReact: string
    public parameters: any[]
    public summary: string

    static deserialize(data: object) {
        let instance = new this;

        for (const [key, value] of Object.entries(data)) {
            instance[key] = value
        }

        return instance
    }
}

