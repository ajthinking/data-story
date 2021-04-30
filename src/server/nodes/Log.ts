import ServerNode from "../ServerNode";

export default class Log extends ServerNode {
    category: string = 'Workflow'    
    summary = 'console.log(inputs)'
    outPorts = []
	name = 'Log'

    async run() {
        console.group('DataStory Log Node: ' + this.id)
        console.log(this.input().map(f => f.original));
        console.log(JSON.stringify(this.input().map(f => f.original)))
        console.groupEnd();
    }
}