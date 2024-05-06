import type { ItemValue } from './ItemValue';
import type { InputObserver } from './InputObserver';

export type NotifyObserversCallback = (InputObserver: InputObserver, items: ItemValue[]) => void;
