import { Callback } from "../types";

export const createLoadObserver: Callback<
  Callback<void, void>,
  Callback<HTMLImageElement, void>
> = (handler: () => void) => {
  let waiting = 0;
  return (el: {
    addEventListener: (arg0: string, arg1: () => void) => void;
  }) => {
    waiting++;
    el.addEventListener("load", () => {
      waiting--;
      if (waiting === 0) {
        handler();
      }
    });
  };
};
