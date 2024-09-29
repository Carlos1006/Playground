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

  const rotationAxis = useRef(new THREE.Vector3(0, 0, 1));
  const targetQuaternion = useRef(new THREE.Quaternion());
  const slerpedQuaternion = useRef(new THREE.Quaternion());

  useFrame((state) => {
    if (rigidBodyRef.current) {
      // Obtener la posición del puntero en coordenadas normalizadas
      const { x, y } = state.pointer;

      // Convertir a coordenadas de mundo
      const worldX = (x * state.viewport.width) / 2;
      const worldY = (y * state.viewport.height) / 2;

      // Obtener la posición actual del objeto en el mundo
      const currentPosition = rigidBodyRef.current.translation();

      // Calcular la dirección desde el objeto hacia el mouse
      const direction = new THREE.Vector3(
        worldX,
        worldY,
        currentPosition.z
      ).sub(currentPosition as THREE.Vector3);

      const distance = direction.length();

      // Si la distancia es menor que un umbral pequeño, detener el objeto
      const stopThreshold = 0.5; // Umbral de distancia para detener el movimiento
      if (distance < stopThreshold) {
        // Establecer la velocidad del RigidBody a 0 en X e Y para detenerlo
        const velocity = distance - 0.2 > 0 ? distance - 0.2 : 0;
        rigidBodyRef.current.setLinvel(
          { x: velocity, y: velocity, z: 0 },
          true
        );
        return; // Salir de la función para evitar aplicar más impulsos
      }

      // Definir la fuerza del impulso basado en la dirección y velocidad deseada
      const strength = Math.min(distance * 0.0005, 1); // Ajusta el factor 0.2 según tus necesidades

      const impulse = direction.normalize().multiplyScalar(strength);

      // Aplicar el impulso en el eje X e Y (Z = 0 para evitar cambios en Z)
      rigidBodyRef.current.applyImpulse(
        { x: impulse.x, y: impulse.y, z: 0 },
        true
      );

      const currentPos = rigidBodyRef.current.translation();
      // Calculate the rotation angle and smoothly rotate the rocket
      const rotationAngle = Math.atan2(
        worldY - currentPos.y,
        worldX - currentPos.x
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
      gravityScale={1}
      onCollisionEnter={handleCollision}
    >
      <group ref={ref} scale={vector}>
        <primitive object={fbx} />
      </group>
    </RigidBody>
  );
};

export default Rocket;
