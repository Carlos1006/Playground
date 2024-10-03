import { IAsteroidContext, IKeys } from "../types";

export const ASTEROID_CONTEXT_DEFAULT: IAsteroidContext = {
  fbx: null,
};

export const KEYS_DEFAULT: IKeys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
};

export const EMPTY_FUNCTION = (): void => {
  return;
};
