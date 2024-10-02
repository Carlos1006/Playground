import { FC, useMemo, useRef } from "react";
import { IParticles } from "../types";
import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Random from "canvas-sketch-util/random";

const Smoke: FC<IParticles> = ({ count = 100 }: IParticles) => {
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = Random.range(-0.02, 0.02);
      const y = Random.range(-10, 0);
      const z = 0; // Limitar el eje Z a 0 para hacerlo bidimensional
      positions.set([x, y, z], i * 3);

      const vx = Random.range(-0.005, 0.005);
      const vy = Random.range(-0.01, -0.05);
      const vz = 0; // Limitar el eje Z a 0 para hacerlo bidimensional
      velocities.set([vx, vy, vz], i * 3);
    }
    return { positions, velocities };
  }, [count]);

  const sizes = useMemo(() => {
    return new Float32Array(
      Array.from({ length: count }, () => Math.random() * 0.3 + 0.1)
    );
  }, [count]);

  useFrame(() => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      const velocities = particles.velocities;
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        if (positions[i + 1] < -10) {
          positions[i] = 0;
          positions[i + 1] = 0;
        }
        // No se actualiza el eje Z para mantenerlo bidimensional
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      <Points ref={meshRef} positions={particles.positions} sizes={sizes}>
        <PointMaterial
          transparent
          sizeAttenuation
          depthWrite={true}
          size={0.1}
          color="white"
          opacity={0.5}
        />
      </Points>
    </group>
  );
};

export default Smoke;
