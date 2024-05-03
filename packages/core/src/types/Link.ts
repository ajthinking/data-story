import { PortId } from './PortId';

export type LinkId = string

export type Link = {
  id: LinkId,
  sourcePortId: PortId,
  targetPortId: PortId,
  label?: string,
  labelBgStyle?: Record<string, any>
}
