import { Link } from './Link';
import { Node } from './Node';
import { Param } from '../Param';

export type SerializedDiagram = {
  type: 'Diagram',
  nodes: Node[],
  links: Link[],
  params: Param[],
  viewport: { x: number, y: number, zoom: number },
}