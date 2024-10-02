import { useLoader, useFrame } from "@react-three/fiber";
import {
  CollisionEnterPayload,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { FC, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { FBXLoader } from "three-stdlib";
import Fire from "./Fire";
import Smoke from "./Smoke";

const Rocket: FC<{ url: string }> = ({ url }) => {
  const ref = useRef<THREE.Group>(null);
  const wrapperRef = useRef<THREE.Group>(null);
  const rigidBodyRef = useRef<RapierRigidBody | null>(null);
  const fbx = useLoader(FBXLoader, url);

  // Estados para la rotación y la velocidad del cohete
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
    if (!rigidBodyRef.current || !ref.current || !wrapperRef.current) return;

    const lerpFactor = 0.1; // Factor de suavizado para la rotación
    const decelerationFactor = 0.05; // Factor de desaceleración para la velocidad
    // Direccion hacia adelante basándonos en la rotación actual
    const direction = new THREE.Vector3(1, 0, 0); // El vector apunta en la dirección hacia arriba (Y)

    // Calcular la nueva velocidad objetivo
    let newTargetVelocity = new THREE.Vector3(0, 0, 0);
    if (keys.current.ArrowLeft)
      newTargetVelocity = direction.multiplyScalar(-5);
    if (keys.current.ArrowRight)
      newTargetVelocity = direction.multiplyScalar(5);

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

    // Aplicar rotación al cohete en el eje Z según la dirección
    let tilt = 0; // Ángulo de inclinación
    if (keys.current.ArrowLeft) tilt = Math.PI / 8; // Inclinación a la izquierda
    if (keys.current.ArrowRight) tilt = -Math.PI / 8; // Inclinación a la derecha

    // Interpolar suavemente hacia la nueva rotación
    wrapperRef.current.rotation.z = THREE.MathUtils.lerp(
      wrapperRef.current.rotation.z,
      tilt,
      0.1
    );

    // Aplicar la nueva velocidad al cuerpo rígido
    rigidBodyRef.current.setLinvel(newVelocity, true);

    // Guardar la nueva velocidad para la próxima iteración
    setVelocity(newVelocity);
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.015;
    }
  });

  return (
    <RigidBody
      ref={(ref): void => {
        rigidBodyRef.current = ref;
      }}
      gravityScale={0}
      onCollisionEnter={handleCollision}
      colliders="cuboid"
      position={[0, -1.5, 0]}
    >
      <group ref={wrapperRef}>
        <group ref={ref} scale={vector} layers={0}>
          <primitive object={fbx} />
        </group>
        <Fire position={[0, -0.17, 0] as unknown as THREE.Vector3} />
        <Fire
          position={[0, -0.35, 0] as unknown as THREE.Vector3}
          scale={0.5}
        />
        <Fire
          position={[0, -0.47, 0] as unknown as THREE.Vector3}
          scale={0.25}
        />
        <Smoke count={100} />
      </group>
    </RigidBody>
  );
};

export default Rocket;
