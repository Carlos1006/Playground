import * as THREE from "three";
import { ReactNode } from "react";
import { RapierRigidBody } from "@react-three/rapier";

export interface IAsteroidContext {
  fbx: THREE.Group | null;
}

export interface IAsteroidProvider {
  children: ReactNode;
}

export interface IAsteroid {
  position?: THREE.Vector3;
  setRef?: (ref: RapierRigidBody | null) => void;
}

export interface IFloor {
  show?: boolean;
}

export interface IFire {
  scale?: number;
  position?: THREE.Vector3;
}

export interface IParticles {
  count: number;
  scale?: number;
  range?: [number, number];
}

export interface IKeys {
  ArrowLeft: boolean;
  ArrowRight: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
}

export type IKeyDirection = keyof IKeys;

export interface ISpaceRocket {
  asteroidScale?: number;
  asteroidCount?: number;
  asteroidRange?: [number, number];
}
