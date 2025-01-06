import { InputObserver } from './InputObserver';
import { LinkItemsParam } from './LinkItemsParam';

export type NotifyObserversCallback = (items: LinkItemsParam[], inputObserver?: InputObserver) => void;
