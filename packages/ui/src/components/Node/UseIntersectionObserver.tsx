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
  const callbackRef = useLatest(callback);
  const [loaderChanged$, updateElement] = useCreation(() => {
    const subject = new BehaviorSubject<HTMLElement | null>(null);

    function updateElement(newElement: HTMLElement | null) {
      if (newElement) {
        subject.next(newElement);
      }
    }

    return [subject, updateElement];
  }, [])
  // make sure the observer is created only once
  const loadMore$ = useCreation(() => {
    return loaderChanged$.pipe(
      filter(it=>!!it),
      distinctUntilChanged(),
      switchMap((el) => observeIntersection(el!)),
      share(),
      concatMap(() => callbackRef.current())
    );
  }, [loaderChanged$]);

  useEffect(() => {
    const sub = loadMore$.subscribe();
    return () => sub.unsubscribe();
  }, [loadMore$]);
  return updateElement;
}
