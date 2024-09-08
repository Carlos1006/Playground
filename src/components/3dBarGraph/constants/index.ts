import { Vector3 } from "@react-three/fiber";

export const BASE_WIDTH = 2;
export const BASE_HEIGHT = 0.02;
export const BASE_DEPTH = 1;
export const SIDE = 0.1;
export const SIDE_COMPENSATION = 0.06;
export const HEIGHT_COMPENSATION = 0.005;
export const AXIS_X = BASE_WIDTH / 2;
export const AXIS_Z = BASE_DEPTH / 2;
export const MIN_VALUE = 0.01;
export const MAX_VALUE = 0.4;
export const COLORS: number[] = [
  0x000000, 0x001018, 0x012031, 0x012f49, 0x023f62, 0x024f7a, 0x025f92,
  0x036fab, 0x037ec3, 0x048edc, 0x049ef4,
];
export const CAMERA_INIT_POSITION: Vector3 = [
  -1.6445867853638974, 1.529323930742849, 1.394547808370072,
];
export const ORBIT_TARGET: Vector3 = [
  0.0893959651036883, 0.05914014949284327, 0.031997034987864145,
];

export const AMBIENT_LIGHT = {
  INTENSITY: Math.PI / 2,
};

export const SPOT_LIGHT = {
  POSITION: [10, 10, 10] as Vector3,
  ANGLE: 0.15,
  PENUMBRA: 1,
  DECAY: 0,
  INTENSITY: Math.PI,
};

export const ORBIT_CONTROLS = {
  AUTO_ROTATE: true,
  AUTO_ROTATE_SPEED: 0.5,
  TARGET: ORBIT_TARGET,
};

export const GROUP = {
  POSITION: [0.2, 0, 0] as Vector3,
};

export const POINT_LIGHT = {
  INTENSITY: Math.PI,
  DECAY: 0,
  POSITION: [-10, -10, -10] as Vector3,
};
