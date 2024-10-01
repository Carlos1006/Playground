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

  // Estados para la rotación y la velocidad del cohete
  const [rotationZ, setRotationZ] = useState(0);
  const [targetRotationZ, setTargetRotationZ] = useState(0);
  const [velocity, setVelocity] = useState(new THREE.Vector3(0, 0, 0)); // Velocidad actual del cohete

  // Teclas activas
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

  // Actualizar rotación y velocidad en cada frame
  useFrame(() => {
    if (!rigidBodyRef.current) return;

    const lerpFactor = 0.1; // Factor de suavizado para la rotación
    const decelerationFactor = 0.05; // Factor de desaceleración para la velocidad

    // Calcular la rotación objetivo en Z
    let newTargetRotationZ = targetRotationZ;
    if (keys.current.ArrowLeft) newTargetRotationZ += 0.05;
    if (keys.current.ArrowRight) newTargetRotationZ -= 0.05;

    // Direccion hacia adelante basándonos en la rotación actual
    const direction = new THREE.Vector3(0, 1, 0); // El vector apunta en la dirección hacia arriba (Y)
    direction.applyAxisAngle(new THREE.Vector3(0, 0, 1), newTargetRotationZ); // Aplicar rotación en el eje Z

    // Calcular la nueva velocidad objetivo
    let newTargetVelocity = new THREE.Vector3(0, 0, 0);
    if (keys.current.ArrowUp) newTargetVelocity = direction.multiplyScalar(3);
    if (keys.current.ArrowDown)
      newTargetVelocity = direction.multiplyScalar(-3);

    // Actualizar la velocidad real del cohete con `lerp` hacia la velocidad objetivo
    const newVelocity = new THREE.Vector3().lerpVectors(
      velocity,
      newTargetVelocity,
      lerpFactor
    );

    // Si no se está presionando ninguna tecla de movimiento, reducir gradualmente la velocidad a cero
    if (!keys.current.ArrowUp && !keys.current.ArrowDown) {
      newVelocity.lerp(new THREE.Vector3(0, 0, 0), decelerationFactor);
    }

    // Aplicar la rotación y la velocidad actualizada usando Rapier
    const interpolatedRotationZ = THREE.MathUtils.lerp(
      rotationZ,
      newTargetRotationZ,
      lerpFactor
    );
    rigidBodyRef.current.setRotation(
      new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, 0, interpolatedRotationZ)
      ),
      true
    );
    rigidBodyRef.current.setLinvel(newVelocity, true); // `setLinvel` para aplicar la velocidad actualizada

    // Actualizar el estado
    setVelocity(newVelocity); // Guardar la nueva velocidad para la próxima iteración
    setRotationZ(interpolatedRotationZ);
    setTargetRotationZ(newTargetRotationZ);
  });

  return (
    <RigidBody
      ref={(ref): void => {
        rigidBodyRef.current = ref;
      }}
      gravityScale={0}
      onCollisionEnter={handleCollision}
      colliders="cuboid"
    >
      <group ref={ref} scale={vector}>
        <primitive object={fbx} />
      </group>
    </RigidBody>
  );
};

export default Rocket;
