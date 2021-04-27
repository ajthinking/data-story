import ServerNode from "../ServerNode";
import ServerNodeInterface from "../ServerNodeInterface";

export default class Log extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Workflow'    
    public static summary = 'console.log(inputs)'
    public static outPorts = []

    async run() {
        console.group('DataStory Log Node: ' + this.id)
        console.log(this.input().map(f => f.original));
        console.log(JSON.stringify(this.input().map(f => f.original)))
        console.groupEnd();
    }
}