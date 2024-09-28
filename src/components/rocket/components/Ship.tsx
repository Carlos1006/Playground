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

  // const viewportSize = { width: window.innerWidth, height: window.innerHeight };
  // const direction = useRef(new THREE.Vector3());
  // const rotationAxis = useRef(new THREE.Vector3(0, 0, 1));
  // const targetQuaternion = useRef(new THREE.Quaternion());
  // const slerpedQuaternion = useRef(new THREE.Quaternion());

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

  // useFrame((state, delta) => {
  //   const rocket = rigidBodyRef.current;
  //   if (!rocket || !viewportSize) return;

  //   // Convert pointer coordinates to viewport space
  //   const x = (state.pointer.x * viewportSize.width) / 2;
  //   const y = (state.pointer.y * viewportSize.height) / 2;

  //   // Calculate distance between current rocket position and target
  //   const currentPos = rocket.translation() as THREE.Vector3;
  //   const targetPos = new THREE.Vector3(x, y, currentPos.z);
  //   const distance = targetPos.distanceTo(currentPos);

  //   // Apply impulse to move rocket toward target
  //   direction.current
  //     .copy(targetPos)
  //     .sub(currentPos)
  //     .normalize()
  //     .multiplyScalar(delta * 0.0001 * distance);
  //   rocket.applyImpulse(direction.current, true);

  //   // Calculate the rotation angle and smoothly rotate the rocket
  //   const rotationAngle = Math.atan2(y - currentPos.y, x - currentPos.x);
  //   targetQuaternion.current.setFromAxisAngle(
  //     rotationAxis.current,
  //     rotationAngle - Math.PI / 2
  //   );
  //   slerpedQuaternion.current.slerpQuaternions(
  //     rocket.rotation(),
  //     targetQuaternion.current,
  //     0.08
  //   );
  //   rocket.setRotation(slerpedQuaternion.current, true);
  // });

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
