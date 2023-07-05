import { Diagram } from "./Diagram";
import { Computer } from "./types/Computer";

export const CustomComputerFactory = {
  fromDiagram(name: string, diagram: Diagram): Computer {

    // 1. Find all INPUT nodes in the diagram.
    // These will translate to input Ports on the Computer.

    // 2. Find all OUTPUT nodes in the diagram.
    // These will translate to output Ports on the Computer.

    // 3 (LATER) Find all PARAMS on the diagram.

    return {
      name,
      label: name,
      inputs: [],
      outputs: [],
      params: {},
      tags: [],
      run: async function*({ input, output }) {
        // MAKE A RunDiagram thing here:

        // 4. For each INPUT node, subscribe to the corresponding input Port. ISH.

        // 5. For each OUTPUT node, subscribe to the corresponding output Port. ISH.
      },
    }
  }  
}