import { InputObserver } from './InputObserver';
import type { ItemValue } from './ItemValue';

export type ReportCallback = (items: ItemValue[], inputObserver: InputObserver[]) => void;
