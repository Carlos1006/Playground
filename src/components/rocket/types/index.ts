import * as THREE from "three";
import { ReactNode } from "react";

export interface IAsteroidContext {
  fbx: THREE.Group | null;
}

export interface IAsteroidProvider {
  children: ReactNode;
}

export interface IAsteroid {
  position?: THREE.Vector3;
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
}

export interface IKeys {
  ArrowLeft: boolean;
  ArrowRight: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
}

export type IKeyDirection = keyof IKeys;
