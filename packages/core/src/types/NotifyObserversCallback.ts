import type { ItemValue } from './ItemValue';
import { InputObserver } from './InputObserver';

export type NotifyObserversCallback = (inputObserver: InputObserver, items: ItemValue[]) => void;
