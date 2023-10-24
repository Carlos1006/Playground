import { useCallback, useMemo } from "react";
import { useMainContext } from "./useMainContext";

type RGBBooleanFunction = (r:number, g:number, b:number) => boolean;

export default function useRandomDataColor() {
  const {
    imgData,
  } = useMainContext();

  const data = useMemo(() => {
    if (!imgData) return null;
    return imgData.data
  }, [imgData]);
  
  const length = useMemo(() => {
    if (data === null) return 0;
    return data.length;
  }, [data]);

  const createRandomColor = useCallback((condition:RGBBooleanFunction = ()=>false):[number,number,number] => {
    if (data === null) return [0,0,0];
    if (length === 0) return [0,0,0];
    const randomIndex = Math.floor(Math.random() * (length / 4));
    const r = data[randomIndex * 4];
    const g = data[randomIndex * 4 + 1];
    const b = data[randomIndex * 4 + 2];
    if (condition(r,g,b)) return createRandomColor();
    return [r,g,b];
  }, [data, length]);

  const rgbToString = useCallback((r:number, g:number, b:number, a = 1):string => {
    return `rgb(${r},${g},${b},${a})`;
  }, []);

  const hslToString = useCallback((h:number, s:number, l:number):string => {
    return `hsl(${h},${s}%,${l}%)`;
  }, []);

  const convertRGBToHSL = useCallback((r:number, g:number, b:number):[number,number,number] => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  }, []);
  
  return {
    createRandomColor,
    rgbToString,
    convertRGBToHSL,
    hslToString
  }
}