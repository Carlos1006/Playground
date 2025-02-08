import { IThemeCss } from "../types/general";
import { MODE } from "../website/web_00/constants";

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function emulateResponse(_result = true): Promise<boolean> {
  await sleep(4000);
  return _result;
}

export function pad(num: number, size: number): string {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export function getThemeClass(themeMode: string, css: IThemeCss): string {
  return themeMode === MODE.DARK
    ? css.dark
    : themeMode === MODE.LIGHT
    ? css.light
    : css.old;
}
