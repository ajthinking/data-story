import { Observable, SubscriptionLike } from 'rxjs';
// todo: need double check the description
/**
 * get data stream from the one port of the element
 */
export interface PortProvider {
  getPort(portName: string): Observable<unknown>;
}

/**
 * creates a granted-to-complete data stream
 * when the data stream completes, the {@link SourceElement} itself also reaches its complete state.
 */
export interface SourceElement {
  elementType: 'source';
  elementName: string;

  getOutput(): PortProvider;
}

/**
 * In circuit, every incoming data from the previous element, makes {@link OperatorElement} create a new granted-to-complete data-stream for the next element.
 * Therefore, {@link OperatorElement} is stateless, it doesn't have a complete state, it propagates the complete state from the previous element to the next element.
 */
export interface OperatorElement {
  elementType: 'operator';
  elementName: string;

  getOutput(inputs: PortProvider): PortProvider;
}

export type WatcherEvent = 'completed' | 'errored';

export interface WatcherResult {
  subscription: SubscriptionLike;
  readonly events: Observable<WatcherEvent>;
}

/**
 * {@link WatcherElement} consumes data from the previous element, when the previous element comes to the complete state, the {@link WatcherElement} reaches to its complete state.
 */
export interface WatcherElement {
  elementType: 'watcher';
  elementName: string;

  watch(inputs: PortProvider): WatcherResult;
}

/**
 * The configuration of the element operator part
 */

export interface SourceElementConfig {
  boot: (param: unknown) => SourceElement;
}

export interface OperatorElementConfig {
  boot: (param: unknown) => OperatorElement;
}

export interface WatcherElementConfig {
  boot: (param?: unknown) => WatcherElement;
}
