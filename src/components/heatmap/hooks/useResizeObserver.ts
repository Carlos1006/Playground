import { RefObject, useEffect } from "react";

interface UseObserverParams {
  target: RefObject<HTMLDivElement>;
  callback: () => void;
}

export function useResizeObserver({
  target,
  callback,
}: UseObserverParams): void {
  useEffect(() => {
    const observer = new ResizeObserver(callback);
    target.current && observer.observe(target.current);
    return () => {
      observer.disconnect();
    };
  }, [target, callback]);
}
