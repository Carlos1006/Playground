import { MutableRefObject } from "react";

export interface IBarGraph3D {
  fov: number;
}

export interface IBar {
  slotX: number;
  slotY: number;
  value: number;
}

export interface ICameraRig {
  fov: number;
  orbit: MutableRefObject<unknown>;
}
