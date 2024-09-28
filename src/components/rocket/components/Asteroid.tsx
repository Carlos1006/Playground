import { useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import useAsteroidContext from "../hooks/useAsteroidContext";

const Asteroid: FC = () => {
  const ref = useRef<THREE.Group>(null);
  const { fbx } = useAsteroidContext();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  const scale = 0.2;
  const vector: THREE.Vector3 = new THREE.Vector3(scale, scale, scale);

  return (
    <RigidBody position={new THREE.Vector3(0, 3, 0)}>
      <group ref={ref} scale={vector}>
        {fbx && <primitive object={fbx.clone()} />}
      </group>
    </RigidBody>
  );
};

export default Asteroid;
