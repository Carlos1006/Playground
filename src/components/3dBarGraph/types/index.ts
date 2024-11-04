import { MutableRefObject } from "react";

export interface IBarGraph3D {
  fov: number;
  autoRotate: boolean;
  orthographic: boolean;
  showCase?: boolean;
}

export interface IBar {
  slotX: number;
  slotY: number;
  value: number;
  onHover: (x: number, y: number, value: boolean) => void;
}

export interface ICameraRig {
  fov: number;
  orbit: MutableRefObject<unknown>;
}
