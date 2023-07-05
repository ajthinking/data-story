import { PortName } from './Computer';
import { LinkId } from '../types/Link';

export type PortLinkMap = Record<PortName, LinkId[]>