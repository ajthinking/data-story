import { Node } from "./types/Node";

export class NodeRunError extends Error {
  constructor({ message, node }: { message: string, node: Node}) {
    super(
      `${message || 'Error'}\nThrown in node ${node.id}`
    );
  }
}