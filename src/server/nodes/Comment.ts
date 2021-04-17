import ServerNode from "../ServerNode";

export default class Comment extends ServerNode {
    public static category: string = 'Workflow'
    public static inPorts:  string[] = [];
    public static outPorts: string[] = [];
    public static summary = 'Display a comment'
    public static nodeReact: string = 'Comment'

    public run() {}
}