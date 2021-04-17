import ServerNode from "../ServerNode";

export default class Inspect extends ServerNode {
    public static category: string = 'Workflow'
    public features: any[]
    public static summary = 'Display features in a table'    

    public static outPorts: string[] = []

    async run() {
        this.features = this.input();
    }
}