export interface IPixel {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface IImage {
  pixels: IPixel[][];
  width: number;
  height: number;
}

export interface INewPixel {
  x: number;
  y: number;
  first: IPixel;
  last: IPixel;
  average: IPixel;
  width: number;
  height: number;
}
