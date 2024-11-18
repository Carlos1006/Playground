import * as THREE from "three";

export interface IGrid {
  showCase?: boolean;
}

export interface IMesh {
  id: number;
  height: number;
}

export interface IVoxel {
  color: THREE.Color;
  height: number;
}

export interface IPixel {
  r: number;
  g: number;
  b: number;
  a: number;
  h: number;
}

export interface IImage {
  pixels: IPixel[][];
  width: number;
  height: number;
}
