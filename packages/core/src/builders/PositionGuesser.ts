import { Diagram } from "../Diagram";
import { Node } from "../types/Node";
import { NodeDescription } from "../types/NodeDescription";

export class PositionGuesser {
  constructor(
    public diagram: Diagram
  ) {}

  guess(
    node: Node | NodeDescription
  ): {x: number, y: number} {
    // Defines starting position for new nodes
    const startX = 75;
    const startY = 50;
    // Spacing between nodes
    const spaceX = 200;
    const spaceY = 200;

    // Get the max X and Y positions of existing nodes
    const maxX = this.diagram.nodes.map((node) => node.position!.x).reduce((max, x) => Math.max(max, x), 0)
    const maxY = this.diagram.nodes.map((node) => node.position!.y).reduce((max, y) => Math.max(max, y), 0)

    const isStarterNode = node.inputs.length === 0;

    if(isStarterNode) {
      return { x: startX, y: maxY === 0 ? startY : maxY + spaceY }
    }

    const mostRecentNode = this.diagram.nodes.at(-1)
    const baseX = mostRecentNode?.position!.x ?? maxX

    return { x: baseX + spaceX, y: mostRecentNode?.position!.y ?? startY + spaceY  }
  }
}