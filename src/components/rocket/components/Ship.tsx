import { useLoader, useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { FC, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three-stdlib";

const Rocket: FC<{ url: string; textureUrl: string }> = ({ url }) => {
  const ref = useRef<THREE.Group>(null);
  const fbx = useLoader(FBXLoader, url);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  const scale = 0.001;
  const vector: THREE.Vector3 = new THREE.Vector3(scale, scale, scale);

  return (
    <RigidBody gravityScale={0}>
      <group ref={ref} scale={vector}>
        <primitive object={fbx} />
      </group>
    </RigidBody>
  );
};

export default Rocket;
