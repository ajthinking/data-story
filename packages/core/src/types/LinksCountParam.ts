import { RequestObserverType } from './InputObserveConfig';
import { LinkId } from './Link';

export type LinksCountParam = {
  type: RequestObserverType.observeLinkCounts;
  linkId: LinkId;
  count: number;
}