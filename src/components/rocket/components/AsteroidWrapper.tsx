import { FC, memo, useRef } from "react";
import Asteroid from "./Asteroid";
import * as THREE from "three";
import { RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import Random from "canvas-sketch-util/random";

const AsteroidWrapper: FC = () => {
  const asteroidRef = useRef<RapierRigidBody | null>(null);
  const moving = useRef<boolean>(false);

  useFrame(() => {
    if (asteroidRef.current) {
      if (!moving.current) {
        asteroidRef.current.applyImpulse(
          new THREE.Vector3(0, -0.0003, 0),
          true
        );
      }
      const position = asteroidRef.current.translation();
      if (position.y < -4) {
        asteroidRef.current.setTranslation(
          new THREE.Vector3(Random.range(-6, 6), 5, 0),
          true
        );
        asteroidRef.current.setLinvel(new THREE.Vector3(0, 0, 0), true);
        asteroidRef.current.setAngvel(new THREE.Vector3(0, 0, 0), true);
      }
    }
  });

  return (
    <Asteroid
      position={new THREE.Vector3(Random.range(-6, 6), 5, 0)}
      setRef={(ref: RapierRigidBody | null): void => {
        asteroidRef.current = ref;
      }}
    />
  );
};

const AsteroidWrapperMemo = memo(AsteroidWrapper);
AsteroidWrapperMemo.displayName = "AsteroidWrapper";
export default AsteroidWrapperMemo;
