import { PortId } from './PortId';
import type { CSSProperties, ReactNode } from 'react';

export type LinkId = string

export type Link = {
  id: LinkId,
  sourcePortId: PortId,
  targetPortId: PortId,
  label?: string | ReactNode;
  labelBgStyle?: CSSProperties;
}
