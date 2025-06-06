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


export function rgbaToHex(red: number, green: number, blue: number): string 
{
  const r = red.toString(16).padStart(2, "0");
  const g = green.toString(16).padStart(2, "0");
  const b = blue.toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}

export function hexToRgba(hex: string): Color
{
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b];
}

export function normalizeRGB(color: Color): Color {
  return color.map((c) => Number((c / 255).toFixed(2))) as Color;
}