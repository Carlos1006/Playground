import { IHomeContext, Language, Position, ThemeMode } from "../types";

export namespace MODE {
  export const LIGHT: ThemeMode = "light";
  export const DARK: ThemeMode = "dark";
  export const OLD: ThemeMode = "old";
}

export const EMPTY_POSITION: Position = {
  x: 0,
  y: 0,
};

export namespace LANGUAGES {
  export const EN: Language = "en";
  export const ES: Language = "es";
}

export const HOME_CONTEXT_DEFAULT: IHomeContext = {
  themeMode: MODE.DARK,
  setThemeMode: (): void => {
    return;
  },
  language: LANGUAGES.ES,
  setLanguage: (): void => {
    return;
  },
};
