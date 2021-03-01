import { NodeDescription } from "../../../core/NodeDescription";
import ServerNode from "../ServerNode";

export default class Sleep extends ServerNode {
    public static category: string = 'Workflow'    
    public static summary = 'Sleep x seconds'    

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

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            {
                default: 5,
                fieldType: "Number",
                name: "seconds_to_sleep",
                value: 5,
            }            
        )

        return description
    }    
}