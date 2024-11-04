import * as THREE from "three";
import { useRef, useMemo, FC } from "react";
import { useFrame } from "@react-three/fiber";
import Random from "canvas-sketch-util/random";
import { IParticles } from "../types";

const Stars: FC<IParticles> = ({
  count,
  scale = 1,
  range = [-50, 50],
}: IParticles) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const light = useRef(null);

  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Random.range(0, 100);
      const factor = Random.range(20, 120);
      const speed = Random.range(0.01, 0.015) / 2;
      const x = Random.range(...range);
      const y = Random.range(...range);
      const z = Random.range(...range);

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count, range]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!mesh.current) return;
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, index) => {
      if (!mesh.current) return;
      const { speed, x, y, z } = particle; // factor

      // Update the particle time
      const t = (particle.time += speed);

      // Update the particle position based on the time
      // This is mostly random trigonometry functions to oscillate around the (x, y, z) point
      //! dummy.position.set(
      //!   x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
      //!   y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
      //!   z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      //! );
      dummy.position.set(x, y, z);

      // Derive an oscillating value which will be used
      // for the particle size and rotation
      const s = Math.cos(t);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={[0, 0, -60]}>
      <pointLight ref={light} distance={1500} intensity={2500} color="white" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.5 * scale, 0]} />
        <meshPhongMaterial color="#050505" />
      </instancedMesh>
    </group>
  );
};

export default Stars;
