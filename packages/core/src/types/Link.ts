import { PortId } from '../types/Port';

export type LinkId = string

export type Link = {
  id: LinkId,
  sourcePortId: PortId,
  targetPortId: PortId,
}
