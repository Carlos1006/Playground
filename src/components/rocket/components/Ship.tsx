import { useLoader, useFrame } from "@react-three/fiber";
import {
  CollisionEnterPayload,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { FC, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three-stdlib";

const Rocket: FC<{ url: string; textureUrl: string }> = ({ url }) => {
  const ref = useRef<THREE.Group>(null);
  const rigidBodyRef = useRef<RapierRigidBody | null>(null);
  const fbx = useLoader(FBXLoader, url);

  const handleCollision = (event: CollisionEnterPayload): void => {
    console.log("Collision detected!", event);
  };

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
    if (rigidBodyRef.current) {
      rigidBodyRef.current.applyImpulse(new THREE.Vector3(0, 0.0001, 0), true);
    }
  });

  const scale = 0.001;
  const vector: THREE.Vector3 = new THREE.Vector3(scale, scale, scale);

  return (
    <RigidBody
      ref={(ref): void => {
        rigidBodyRef.current = ref;
      }}
      gravityScale={0}
      onCollisionEnter={handleCollision}
    >
      <group ref={ref} scale={vector}>
        <primitive object={fbx} />
      </group>
    </RigidBody>
  );
};

export default Rocket;
