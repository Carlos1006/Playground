import { IImage, INewPixel, IPixel } from "../types";

export default class Mask {
  public image: IImage;
  public pixelSize: number;
  public mosaic: INewPixel[] = [];
  public frame = 0;
  public currentPixel = 0;

  constructor(image: IImage, pixelSize: number) {
    this.image = image;
    this.pixelSize = pixelSize;
  }

  getAvgPixel(pixels: IPixel[]): IPixel {
    const avgPixel = pixels.reduce(
      (acc, { r, g, b, a }) => {
        acc.r += r;
        acc.g += g;
        acc.b += b;
        acc.a += a;
        return acc;
      },
      { r: 0, g: 0, b: 0, a: 0 }
    );

    avgPixel.r = Math.round(avgPixel.r / pixels.length);
    avgPixel.g = Math.round(avgPixel.g / pixels.length);
    avgPixel.b = Math.round(avgPixel.b / pixels.length);
    avgPixel.a = Math.round(avgPixel.a / pixels.length);

    return avgPixel;
  }

  fill(oX: number, oY: number): void {
    // * o is for origin
    const { image, pixelSize } = this;
    const pixels: IPixel[] = [];

    for (let x = oX; x < oX + pixelSize; x++) {
      for (let y = oY; y < oY + pixelSize; y++) {
        const pixel = image.pixels[x]?.[y];
        if (pixel) {
          pixels.push(pixel);
        }
      }
    }

    const avgPixel = this.getAvgPixel(pixels);
    const firstColor = pixels[0];
    const lastColor = pixels[pixels.length - 1];
    this.mosaic.push({
      x: oX,
      y: oY,
      first: firstColor,
      last: lastColor,
      average: avgPixel,
      width: pixelSize,
      height: pixelSize,
    });
  }

  async beginDrawAsync(ctx: CanvasRenderingContext2D): Promise<void> {
    this.currentPixel = 0;
    this.drawAsync(ctx);
  }

  async drawAsync(ctx: CanvasRenderingContext2D): Promise<void> {
    this.frame = requestAnimationFrame(() => {
      if (this.currentPixel >= this.mosaic.length) {
        cancelAnimationFrame(this.frame);
        return;
      }
      const { x, y, average, width, height } = this.mosaic[this.currentPixel];
      ctx.fillStyle = `rgba(${average.r}, ${average.g}, ${average.b}, ${average.a})`;
      ctx.fillRect(x, y, width, height);
      this.currentPixel++;
      this.drawAsync(ctx);
    });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.mosaic.forEach(({ x, y, average, width, height }) => {
      ctx.fillStyle = `rgba(${average.r}, ${average.g}, ${average.b}, ${average.a})`;
      ctx.fillRect(x, y, width, height);
    });
  }

  drawGradient(ctx: CanvasRenderingContext2D): void {
    this.mosaic.forEach(({ x, y, first, last, width, height }) => {
      const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
      gradient.addColorStop(
        0,
        `rgba(${first.r}, ${first.g}, ${first.b}, ${first.a})`
      );
      gradient.addColorStop(
        1,
        `rgba(${last.r}, ${last.g}, ${last.b}, ${last.a})`
      );
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, width, height);
    });
  }
}
