import { RequestObserverType } from './InputObserveConfig';

export type LinksCountParam = {
  type: RequestObserverType.observeLinkCounts;
  linkId: string;
  count: number;
}