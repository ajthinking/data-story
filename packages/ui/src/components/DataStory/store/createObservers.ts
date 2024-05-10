import { ObserverMap, ServerClientObservationConfig } from '../types';
import { InputObserver } from '@data-story/core';

export function createObservers(observerMap: ObserverMap): ServerClientObservationConfig {
  const newInputObservers: InputObserver[] = Array.from(observerMap.entries()).map(([key, observer]) => {
    return observer.inputObservers.map((inputObserver) => {
      return {
        ...inputObserver,
        observerId: key,
      }
    });
  }).flat();

  return {
    inputObservers: newInputObservers,
    onDataChange: (items, inputObservers) => {
      inputObservers.forEach((inputObserver) => {
        const observer = observerMap.get(inputObserver!.observerId);
        if (observer) {
          observer.onDataChange(items, inputObserver);
        }
      });
    }
  };
}
