import * as THREE from "three";
import { Color } from "../types";

export function getPosition(
  latitude: number,
  longitude: number,
  radius: number
): THREE.Vector3 {
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = longitude * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

export function rgbaToHex(red: number, green: number, blue: number): string {
  const r = red.toString(16).padStart(2, "0");
  const g = green.toString(16).padStart(2, "0");
  const b = blue.toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}

export function hexToRgba(hex: string): Color {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b];
}

export function normalizeRGB(color: Color): Color {
  return color.map((c) => Number((c / 255).toFixed(2))) as Color;
}

export const createCanvasTexture = (): THREE.CanvasTexture => {
  const size = 300;
  const squareSize = 100;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Fondo transparente por defecto
  ctx.clearRect(0, 0, size, size);

  // Dibujar el cuadrado negro en el centro
  const offset = (size - squareSize) / 2;
  ctx.fillStyle = "black";
  ctx.fillRect(offset, offset, squareSize, squareSize);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

export function createHexagonTextureBricked(
  image: HTMLImageElement,
  radius = 10,
  spacing = 5,
  scale = 4 // Escala para mejorar resolución
): THREE.CanvasTexture {
  const width = image.width * scale;
  const height = image.height * scale;

  const canvas = document.createElement("canvas");
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = canvas.getContext("2d")!;
  canvas.width = width;
  canvas.height = height;

  const hexWidth = Math.sqrt(3) * radius;
  const hexHeight = 2 * radius;
  const horizDist = hexWidth + spacing;
  const vertDist = (3 / 4) * hexHeight + spacing;

  const tempCanvas = document.createElement("canvas");
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tempCtx = tempCanvas.getContext("2d")!;
  tempCanvas.width = width;
  tempCanvas.height = height;

  // Escalar la imagen original para más detalle
  tempCtx.drawImage(image, 0, 0, width, height);

  for (let y = 0; y < height + hexHeight; y += vertDist) {
    for (let x = 0; x < width + hexWidth; x += horizDist) {
      const offsetX = (Math.floor(y / vertDist) % 2) * (hexWidth / 2);
      const cx = x + offsetX;
      const cy = y;

      const sampleX = Math.floor(cx);
      const sampleY = Math.floor(cy);
      if (sampleX >= width || sampleY >= height) continue;

      const pixel = tempCtx.getImageData(sampleX, sampleY, 1, 1).data;
      const color = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${
        pixel[3] / 255
      })`;

      drawVerticalHexagon(ctx, cx, cy, radius, color);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 32;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  return texture;
}

function drawVerticalHexagon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  fill: string
): void {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30); // -30° para que la punta esté arriba
    const px = x + r * Math.cos(angle);
    const py = y + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}
