import { IHomeContext, Language, Position, ThemeMode } from "../types";
import dayjs from "dayjs";

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
};

export const MY_NAME = "Carlos Daniel Gonzalez";
export const FULL_NAME = "Carlos Daniel Gonzalez Lopez";
export const BIRTH_DATE = dayjs("1994-10-06");
export const PHONE_NUMBER = "+52 1 811 035 1117";
export const EMAIL = "cdgzz19@gmail.com";
