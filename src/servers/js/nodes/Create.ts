import ServerNode from "../ServerNode";

export default class Create extends ServerNode {
    public static inPorts: Array<String> = []

    run() {
        this.output(
            [
                {'creation_id': 0},
                {'creation_id': 1},
                {'creation_id': 2},
                {'creation_id': 3},
                {'creation_id': 4},                                
            ]
        );
    }
}