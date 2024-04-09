import { useCreation, useLatest } from 'ahooks';
import { concatMap, EMPTY, Observable, share } from 'rxjs';
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

export function useIntersectionObserver(element: HTMLElement | undefined, callback: () => Promise<void>) {
  const callbackRef = useLatest(callback);
  // make sure the observer is created only once
  const loadMore$ = useCreation(() => {
    if (element) {
      return observeIntersection(element).pipe(share(), concatMap(() => callbackRef.current()));
    }
    return EMPTY;
  }, [element]);

  useEffect(() => {
    const sub = loadMore$.subscribe();
    return () => sub.unsubscribe();
  }, [loadMore$]);
}
