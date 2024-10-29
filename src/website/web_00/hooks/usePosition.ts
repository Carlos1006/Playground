import { useEffect, useRef, useState } from "react";
import { EMPTY_POSITION } from "../constants";
import { IUsePosition, Position } from "../types";

export default function usePosition<Element>(): IUsePosition<Element> {
  const [position, setPosition] = useState<Position>(EMPTY_POSITION);
  const ref = useRef<Element>(null);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current as unknown as HTMLElement;
      const { height } = element.getBoundingClientRect();

      setPosition({
        x: element.offsetLeft,
        y: element.offsetTop + height,
      });
    }
  }, [ref]);

  return {
    ref,
    position,
  };
}
