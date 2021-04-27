import ServerNode from "../ServerNode";
import ServerNodeInterface from "../ServerNodeInterface";

export default class Comment extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Workflow'
    public static inPorts:  string[] = [];
    public static outPorts: string[] = [];
    public static summary = 'Display a comment'
    public static nodeReact: string = 'Comment'

    public run() {}
}