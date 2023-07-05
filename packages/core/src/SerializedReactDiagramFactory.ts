import { SerializedReactFlow } from "./types/SerializedReactFlow"
import { Diagram } from "./Diagram"
import { ComputerRegistry } from "./computerRegistry"

export const SerializedReactDiagramFactory = {
  fromDiagram: (diagram: Diagram): SerializedReactFlow => {

    return {
      nodes: diagram.nodes.map(node => {
        const computer = ComputerRegistry.descriptions()
          .find(computer => computer.name === node.type)!

        return {
          "width": 128,
          "height": 52,
          "id": node.id,
          "position": {
            "x": node.position!.x,
            "y": node.position!.y
          },
          data: {
            params: node.params,
            "computer": node.type,
            "label": (node?.params?.label?.value || node.type) as string,
            "inputs": computer.inputs.map(input => {
              return {
                "id": `${node.id}.${input.name}`,
                "name": input.name,
                "schema": input.schema,
              }
            }),
            "outputs": computer.outputs.map(output => {
              return {
                "id": `${node.id}.${output.name}`,
                "name": output.name,
                "schema": output.schema,
              }
            }),
          },
          type: "dataStoryNodeComponent",
        }
      }),
      edges: diagram.links.map(link => {
        return {
          "sourceHandle": link.sourcePortId,
          "targetHandle": link.targetPortId,
          "source": diagram.nodes.find(node => node.outputs.find(output => output.id === link.sourcePortId) !== undefined)!.id,
          "target": diagram.nodes.find(node => node.inputs.find(input => input.id === link.targetPortId) !== undefined)!.id,
          "id": link.id,
        }
      }),
      "viewport": {
        "x": 0,
        "y": 0,
        "zoom": 1
      }      
    }   
  },
}