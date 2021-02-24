import ServerNode from "../ServerNode";

export default class Inspect extends ServerNode {
    public features: Array<any>

    public static outPorts: Array<String> = []

    run() {
        this.features = this.input();
    }     
}