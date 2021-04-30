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
            }, parseInt(this.getParameter('seconds_to_sleep').value) * 1000)
        })        
    }

    serialize() {
        let description = super.serialize()

        description.parameters.push(
            NodeParameter.make('seconds_to_sleep').withFieldType("Number").withValue(5),            
        )

        return description
    }    
}