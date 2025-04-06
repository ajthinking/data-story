import { RequestObserverType } from './InputObserveConfig';
import { LinkId } from './Link';

export type LinksCountUpdate = {
  type: RequestObserverType.observeLinkCounts;
  linkId: LinkId;
  count: number;
}