import { useCreation, useLatest } from 'ahooks';
import { BehaviorSubject, concatMap, distinctUntilChanged, filter, Observable, share, switchMap } from 'rxjs';
import { useEffect } from 'react';

function observeIntersection(element: HTMLElement) {
  return new Observable<IntersectionObserverEntry>(subscriber => {
    const observer = new IntersectionObserver(entries => {
      // Check if the observed entry is intersecting (visible)
      if (entries[0].isIntersecting) {
        subscriber.next(entries[0]);
      }
    }, { threshold: 0 });
    // Observe the loader div
    observer.observe(element);
    return () => observer.disconnect();
  })
}

export function useIntersectionObserver(callback: () => Promise<void>) {
  // Use useLatest to ensure the callback is always the latest
  const callbackRef = useLatest(callback);

  const [loaderChanged$, updateElement] = useCreation(() => {
    // updateElement might be called before subscription, so use BehaviorSubject to replay the most recent call to updateElement. This ensures that subscribers do not miss the mounting event of the sentinel element
    const subject = new BehaviorSubject<HTMLElement | null>(null);

    // updateElement is a react callback ref, called when the dom is created. Through it, one can subscribe to the event that the sentinel element has been created.
    function updateElement(newElement: HTMLElement | null) {
      if (newElement) {
        subject.next(newElement);
      }
    }

    return [subject, updateElement];
  }, []);

  // This stream is responsible for listening to the appearance of DOM elements and triggering the callback function
  const loadMore$ = useCreation(() => {
    return loaderChanged$.pipe(
      // If it is null, this means the sentinel element has not been rendered to the page yet. No need to start listening
      filter(it => !!it),
      // Avoid the same sentinel element being listened to repeatedly
      distinctUntilChanged(),
      // Created event stream switches to the become visible event stream of the sentinel element
      switchMap((el) => observeIntersection(el!)),
      // Share the IntersectionObserver instance between all subscribers
      share(),
      // Ensure that the emitted requests are returned in order.
      concatMap(() => callbackRef.current())
    );
  }, [loaderChanged$]);

  useEffect(() => {
    const sub = loadMore$.subscribe();
    return () => sub.unsubscribe();
  }, [loadMore$]);

  return updateElement;
}
