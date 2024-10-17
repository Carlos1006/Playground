import { IHomeContext, ThemeMode } from "../types";

export namespace MODE {
  export const LIGHT: ThemeMode = "light";
  export const DARK: ThemeMode = "dark";
  export const OLD: ThemeMode = "old";
}

export const HOME_CONTEXT_DEFAULT: IHomeContext = {
  themeMode: MODE.DARK,
  setThemeMode: (): void => {
    return;
  },
};
