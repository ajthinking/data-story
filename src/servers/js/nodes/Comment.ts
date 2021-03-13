import ServerNode from "../ServerNode";

export default class Comment extends ServerNode {
    public static category: string = 'Workflow'
    public static inPorts:  Array<String> = [];
    public static outPorts: Array<String> = [];
    public static summary = 'Display a comment'
    public static nodeReact: string = 'Comment'
}