import { useLoader, useFrame } from "@react-three/fiber";
import {
  CollisionEnterPayload,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { FC, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { FBXLoader } from "three-stdlib";

const Rocket: FC<{ url: string }> = ({ url }) => {
  const ref = useRef<THREE.Group>(null);
  const rigidBodyRef = useRef<RapierRigidBody | null>(null);
  const fbx = useLoader(FBXLoader, url);

  // Estado para la rotación en Z y para la velocidad de movimiento
  const [rotationZ, setRotationZ] = useState(0);
  const [, setVelocity] = useState(new THREE.Vector3(0, 0, 0));

  // Registrar las teclas activas
  const keys = useRef<{ [key: string]: boolean }>({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  // Manejar colisiones
  const handleCollision = (event: CollisionEnterPayload): void => {
    console.log("Collision detected!", event);
  };

  const scale = 0.001;
  const vector: THREE.Vector3 = new THREE.Vector3(scale, scale, scale);

  // Añadir y quitar eventos de teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key in keys.current) keys.current[event.key] = true;
    };
    const handleKeyUp = (event: KeyboardEvent): void => {
      if (event.key in keys.current) keys.current[event.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Actualizar la rotación y velocidad en cada frame
  useFrame(() => {
    let newRotationZ = rotationZ;

    // Rotar a la izquierda o derecha en el eje Z
    if (keys.current.ArrowLeft) newRotationZ += 0.05;
    if (keys.current.ArrowRight) newRotationZ -= 0.05;

    // Direccion hacia adelante basándonos en la rotación actual
    const direction = new THREE.Vector3(0, 1, 0); // El vector apunta en la dirección hacia arriba (Y)
    direction.applyAxisAngle(new THREE.Vector3(0, 0, 1), newRotationZ); // Aplicar rotación en el eje Z

    // Calcular nueva velocidad basada en las teclas arriba/abajo
    let newVelocity = new THREE.Vector3(0, 0, 0); // Por defecto, velocidad es 0

    if (keys.current.ArrowUp) newVelocity = direction.multiplyScalar(0.1); // Empujar hacia adelante
    if (keys.current.ArrowDown) newVelocity = direction.multiplyScalar(-0.1); // Empujar hacia atrás

    // Actualizar rotación y velocidad en el estado
    setVelocity(newVelocity);
    setRotationZ(newRotationZ);

    // Aplicar los cambios al grupo de la nave
    if (ref.current) {
      ref.current.rotation.z = newRotationZ; // Aplicar la rotación Z
      ref.current.position.add(newVelocity); // Aplicar el movimiento basado en la nueva velocidad
    }
  });

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
