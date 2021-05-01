import ServerNode from "../ServerNode";

export default class Alert extends ServerNode {
    category: string = 'Workflow'    
    summary = 'Alert with content of first feature'
	name = 'Alert'
	outPorts = []

    async run() {
        // alert(
		// 	this.input()[0]?.original ?? 'Alert!'
		// ) 
    }   
}