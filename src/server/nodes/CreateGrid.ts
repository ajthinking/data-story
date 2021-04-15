import Feature from "../../core/Feature";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";

export default class CreateGrid extends ServerNode {
    public static category: string = 'Reader'    
    public static inPorts: Array<String> = []
    public static summary = 'Create a set of objects with coordinates x and y'    

    async run() {
        let gridSizeX = parseInt(this.getParameterValue('grid_size_x'))
        let gridSizeY = parseInt(this.getParameterValue('grid_size_y'))
        let gridStartX = parseInt(this.getParameterValue('grid_start_x'))
        let gridStartY = parseInt(this.getParameterValue('grid_start_y'))
        let gridSpacingX = parseInt(this.getParameterValue('grid_spacing_x'))
        let gridSpacingY = parseInt(this.getParameterValue('grid_spacing_y'))

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
            {
                fieldType: "Number",
                name: "grid_size_x",
                value: 10,
            },
            {
                fieldType: "Number",
                name: "grid_size_y",
                value: 10,
            },
            {
                fieldType: "Number",
                name: "grid_start_x",
                value: 0,
            },
            {
                fieldType: "Number",
                name: "grid_start_y",
                value: 0,
            },                        
            {
                fieldType: "Number",
                name: "grid_spacing_x",
                value: 10,
            },
            {
                fieldType: "Number",
                name: "grid_spacing_y",
                value: 10,
            },                                    
        )

        return description
    }    
}