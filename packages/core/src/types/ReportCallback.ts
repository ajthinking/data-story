import { InputObserver } from './InputObserver';
import type { ItemValue } from './ItemValue';

export type ReportCallback = (inputObserver: InputObserver[], items: ItemValue[]) => void;
