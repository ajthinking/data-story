import ServerNode from "../ServerNode";

export default class Log extends ServerNode {
    public static category: string = 'Workflow'    
    public static summary = 'console.log(inputs)'    

    async run() {
        console.group('DataStory Log Node: ' + this.id)
        console.log(this.input());
        console.groupEnd();
    }
}