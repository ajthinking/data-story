import Feature from "../../core/Feature";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import ServerNodeInterface from "../ServerNodeInterface";

export default class CreateGrid extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Reader'    
    public static inPorts: string[] = []
    public static summary = 'Create a set of objects with coordinates x and y'    

    async run() {
        let gridSizeX = parseInt(this.getParameterValue('grid_size_x'))
        let gridSizeY = parseInt(this.getParameterValue('grid_size_y'))
        let gridStartX = parseFloat(this.getParameterValue('grid_start_x'))
        let gridStartY = parseFloat(this.getParameterValue('grid_start_y'))
        let gridSpacingX = parseFloat(this.getParameterValue('grid_spacing_x'))
        let gridSpacingY = parseFloat(this.getParameterValue('grid_spacing_y'))

        let features = [];

        for(let x = 0; x < gridSizeX; x++) {
            for(let y = 0; y < gridSizeY; y++) {
                features.push(
                    new Feature({
                        x: gridStartX + x * gridSpacingX,
                        y: gridStartY + y * gridSpacingY,
                    })
                )
            }            
        }

        this.output(features);       
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            NodeParameter.make('grid_size_x').withFieldType("Number").withValue(10),
            NodeParameter.make('grid_size_y').withFieldType("Number").withValue(10),
            NodeParameter.make('grid_start_x').withFieldType("Number").withValue(0),
            NodeParameter.make('grid_start_y').withFieldType("Number").withValue(0),
            NodeParameter.make('grid_spacing_x').withFieldType("Number").withValue(1),
            NodeParameter.make('grid_spacing_y').withFieldType("Number").withValue(1),                                    
        )

        return description
    }    
}