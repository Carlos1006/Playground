import { IImage, IPixel } from "../types";

export const createPixelMatrix = (data: ImageData): IImage => {
  const pixelMatrix: IPixel[][] = [];
  const width = data.width;
  for (let i = 0; i < data.data.length; i += 4) {
    const x = (i / 4) % width;
    const y = Math.floor(i / 4 / width);
    if (!pixelMatrix[x]) pixelMatrix[x] = [];
    pixelMatrix[x][y] = {
      r: data.data[i],
      g: data.data[i + 1],
      b: data.data[i + 2],
      a: data.data[i + 3],
    };
  }
  return {
    pixels: pixelMatrix,
    width: data.width,
    height: data.height,
  };
};

export const getPixel = (image: IImage, x: number, y: number): IPixel => {
  if (image.pixels[y] && image.pixels[y][x]) return image.pixels[y][x];
  return { r: 0, g: 0, b: 0, a: 0 };
};
