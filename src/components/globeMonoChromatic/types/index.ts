import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";

export interface IOrbitControl {
  target: {
    set: (x: number, y: number, z: number) => void;
  }
}

export type MeshRef = Mesh<
  BufferGeometry<NormalBufferAttributes>,
  Material | Material[],
  Object3DEventMap
> | null;

export interface IDot {
  position: THREE.Vector3;
  city: ICity;
}

export interface ICity {
  name: string;
  country: string;
  color: string;
  latitude: number;
  longitude: number;
}

export interface ITooltip extends ICity {
  position: THREE.Vector3;
}

export type Color = [number, number, number];
export type ColorRGBA = [number, number, number, number];

export interface IColorPicker {
  title: string;
  alpha: number;
  color: Color;
  onChange: (color: ColorRGBA) => void;
}

export interface IGlobeMonoChromatic {
  background: ColorRGBA;
  outline: ColorRGBA;
  land: ColorRGBA;
}