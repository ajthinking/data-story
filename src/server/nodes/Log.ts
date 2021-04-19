import ServerNode from "../ServerNode";

export default class Log extends ServerNode {
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