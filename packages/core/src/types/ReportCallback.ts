import { InputObserver } from './InputObserver';
import type { ItemValue } from './ItemValue';

export type ReportCallback = (params: {
  items: ItemValue[],
  inputObserver?: InputObserver,
  inputObservers?: InputObserver[]
}) => void;
