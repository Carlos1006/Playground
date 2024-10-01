import { useLoader, useFrame } from "@react-three/fiber";
import {
  CollisionEnterPayload,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { FC, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three-stdlib";

const Rocket: FC<{ url: string }> = ({ url }) => {
  const ref = useRef<THREE.Group>(null);
  const rigidBodyRef = useRef<RapierRigidBody | null>(null);
  const fbx = useLoader(FBXLoader, url);

  // Posiciones objetivo y actuales para la interpolación
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
  const rotationAxis = useRef(new THREE.Vector3(0, 0, 1));
  const targetQuaternion = useRef(new THREE.Quaternion());
  const slerpedQuaternion = useRef(new THREE.Quaternion());

  const currentPosition = useRef(new THREE.Vector3(0, 0, 0));

  const handleCollision = (event: CollisionEnterPayload): void => {
    console.log("Collision detected!", event);
  };

  useFrame((state) => {
    if (rigidBodyRef.current) {
      const { x, y } = state.pointer;
      const worldX = (x * state.viewport.width) / 2;
      const worldY = (y * state.viewport.height) / 2;
      const currentPosition2 = rigidBodyRef.current.translation();

      // Definir la posición objetivo en base a la posición del cursor
      targetPosition.current.set(worldX, worldY, 0);

      // Interpolar la posición actual hacia la posición objetivo para suavizar el movimiento
      currentPosition.current.lerp(targetPosition.current, 0.01);

      // Mover el RigidBody hacia la nueva posición suavizada
      rigidBodyRef.current.setTranslation(
        { x: currentPosition.current.x, y: currentPosition.current.y, z: 0 },
        true
      );

      // Calculate the rotation angle and smoothly rotate the rocket
      const rotationAngle = Math.atan2(
        worldY - currentPosition2.y,
        worldX - currentPosition2.x
      );
      targetQuaternion.current.setFromAxisAngle(
        rotationAxis.current,
        rotationAngle - Math.PI / 2
      );
      slerpedQuaternion.current.slerpQuaternions(
        (
          rigidBodyRef.current as unknown as {
            rotation: () => THREE.Quaternion;
          }
        ).rotation(),
        targetQuaternion.current,
        0.08
      );
      rigidBodyRef.current.setRotation(slerpedQuaternion.current, true);
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
