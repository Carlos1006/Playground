import { useRef, FC } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Particle: FC<{ position: THREE.Vector3 }> = ({ position }) => {
  const ref = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(new THREE.Vector3().copy(position));

  const randomX = useRef(Math.random() * 0.1 - 0.05);
  const randomZ = useRef(Math.random() * 0.1 - 0.05);
  const randomY = useRef(Math.random() * 0.1 - 0.05);

  useFrame(() => {
    if (ref.current && initialPosition.current) {
      const distance = ref.current.position.distanceTo(initialPosition.current);
      if (distance > 10) {
        ref.current.position.copy(initialPosition.current);
      }
      ref.current.position.y -= randomY.current;
      ref.current.position.x += randomX.current;
      ref.current.position.z += randomZ.current;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

export default Particle;
