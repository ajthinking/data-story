import { InputObserver, ItemValue } from '@data-story/core';
import { UnaryFunction, Observable, concatMap, bufferTime, pipe } from 'rxjs';

function groupNotifications(data: {
  items: ItemValue[],
  inputObservers: InputObserver[]
}[]) {
  const getNotifyObserverKey = (items: ItemValue[], inputObservers: InputObserver[]) => {
    const key = inputObservers.map((inputObserver) => {
      return inputObserver.observerId;
    }).sort().join(',');
    return key;
  }

  const groupedNotificationMap = new Map<string, {items: ItemValue[], inputObservers: InputObserver[]}>();
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

export function clientBuffer(bufferTimeSpan: number = 500): UnaryFunction<Observable<{
  items: ItemValue[],
  inputObservers: InputObserver[]
}>, Observable<{items: ItemValue[], inputObservers: InputObserver[]}>> {
  return pipe(
    bufferTime(bufferTimeSpan),
    concatMap(groupNotifications)
  );
}
