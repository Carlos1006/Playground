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
