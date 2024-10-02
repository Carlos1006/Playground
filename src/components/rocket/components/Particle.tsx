import { useRef, FC } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { between } from "../utils";

const Particle: FC<{ position: THREE.Vector3 }> = ({ position }) => {
  const ref = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(new THREE.Vector3().copy(position));

  // Factores de movimiento aleatorios para cada partícula
  const randomX = useRef(between(-1, 1) / 500);
  const randomZ = useRef(between(-1, 1) / 500);
  // const randomY = useRef(between(0.5, 2) / 500); // Movimiento más suave hacia arriba
  const timeToWait = useRef(between(0, 5)); // Tiempo de espera inicial
  const scale = useRef(1);

  // Configuración de desvanecimiento
  const opacity = useRef(1.0); // Transparencia inicial de la partícula
  const fadeSpeed = 0.001; // Velocidad de desvanecimiento

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current && initialPosition.current && time > timeToWait.current) {
      // Movimiento hacia arriba con variación en x y z
      ref.current.position.y -= 0.01;
      ref.current.position.x += randomX.current;
      ref.current.position.z += randomZ.current;

      // Reducir la opacidad para dar efecto de humo que se desvanece
      opacity.current = Math.max(0, opacity.current - fadeSpeed);
      (ref.current.material as THREE.Material).opacity = opacity.current;

      // Agrandar ligeramente la partícula para simular expansión del humo
      ref.current.scale.addScalar(0.001);

      // Si la partícula se desvanece por completo, reiniciar
      if (opacity.current <= 0) {
        ref.current.position.copy(initialPosition.current);
        ref.current.scale.set(scale.current, scale.current, scale.current); // Reiniciar escala
        opacity.current = 1.0; // Reiniciar opacidad
      }
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale.current}>
      {/* Usar geometría más suave para el humo */}
      <sphereGeometry args={[0.05, 16, 16]} />
      {/* Material con transparencia */}
      <meshStandardMaterial
        color="white"
        transparent
        opacity={opacity.current}
      />
    </mesh>
  );
};

export default Particle;
