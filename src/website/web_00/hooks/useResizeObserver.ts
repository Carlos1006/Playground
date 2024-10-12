import { useEffect } from "react";
import { IUserResizeObserverParams } from "../types";

export default function useResizeObserver(
  params: IUserResizeObserverParams
): void {
  const { ref, onResize } = params;
  useEffect(() => {
    const observer = new ResizeObserver(onResize);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, onResize]);
}
