import { InputObserver, ItemValue } from '@data-story/core';
import { bufferTime, concatMap, Observable, pipe, UnaryFunction } from 'rxjs';

interface ObserverParams {
  items: ItemValue[];
  inputObservers: InputObserver[];
}

function groupNotifications(data: ObserverParams[]) {
  const getNotifyObserverKey = (items: ItemValue[], inputObservers: InputObserver[]) => {
    return inputObservers.map((inputObserver) => {
      return inputObserver.type;
    }).sort().join(',');
  }

  const groupedNotificationMap = new Map<string, ObserverParams>();
  data.forEach((d) => {
    const key = getNotifyObserverKey(d.items, d.inputObservers);
    if (groupedNotificationMap.has(key)) {
      const current = groupedNotificationMap.get(key);
      if (current) {
        groupedNotificationMap.set(key, {
          items: current.items.concat(d.items),
          inputObservers: current.inputObservers
        });
      }
    } else {
      groupedNotificationMap.set(key, d);
    }
  })
  return Array.from(groupedNotificationMap.values());
}

export function clientBuffer(bufferTimeSpan: number = 500): UnaryFunction<Observable<ObserverParams>, Observable<ObserverParams>> {
  return pipe(
    bufferTime(bufferTimeSpan),
    concatMap(groupNotifications)
  );
}
