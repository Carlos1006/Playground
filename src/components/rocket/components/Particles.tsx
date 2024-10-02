import { FC, useMemo, useRef } from "react";
import { IParticles } from "../types";
import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Particles: FC<IParticles> = ({ count = 100 }: IParticles) => {
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = 0; // Limitar el eje Z a 0 para hacerlo bidimensional

      // ! const x = 0;
      // ! const y = 0;
      // ! const z = 0; // Limitar el eje Z a 0 para hacerlo bidimensional

      positions.set([x, y, z], i * 3);

      const vx = (Math.random() - 0.5) * 0.1;
      const vy = (Math.random() - 0.5) * 0.1;
      const vz = 0; // Limitar el eje Z a 0 para hacerlo bidimensional
      velocities.set([vx, vy, vz], i * 3);
    }
    return { positions, velocities };
  }, [count]);

  useFrame(() => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      const velocities = particles.velocities;
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        // No se actualiza el eje Z para mantenerlo bidimensional
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const sizes = useMemo(() => {
    return new Float32Array(
      Array.from({ length: count }, () => Math.random() * 0.3 + 0.1)
    );
  }, [count]);

  return (
    <Points ref={meshRef} positions={particles.positions} sizes={sizes}>
      <PointMaterial
        transparent
        sizeAttenuation
        depthWrite={false}
        size={0.2}
        color="white"
        opacity={0.7}
      />
    </Points>
  );
};

export default Particles;
