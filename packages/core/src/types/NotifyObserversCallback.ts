import type { ItemValue } from './ItemValue';
import { InputObserver } from './InputObserver';

export type NotifyObserversCallback = (items: ItemValue[], inputObserver: InputObserver) => void;
