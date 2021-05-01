import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class Sleep extends ServerNode {
    category: string = 'Workflow'    
    summary = 'Sleep x seconds'
	name = 'Sleep'    

    async run() {
        this.output(
            this.input()
        );

        return new Promise(resolve => {
            let wait = setTimeout(() => {
                if(typeof wait !== "undefined"){
                    clearTimeout(wait);
                }
                resolve('Node complete');
            }, parseInt(this.getParameterValue('seconds_to_sleep')) * 1000)
        })        
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.number('seconds_to_sleep').withValue(5),            
		]
	}
}