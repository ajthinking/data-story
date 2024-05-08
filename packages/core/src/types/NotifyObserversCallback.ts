import type { ItemValue } from './ItemValue';
import type { InputObserver } from './InputObserver';

export type NotifyObserversCallback = (inputObserver: InputObserver, items: ItemValue[]) => void;
