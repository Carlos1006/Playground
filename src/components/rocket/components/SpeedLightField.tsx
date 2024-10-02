import { useState, FC } from "react";
import Particle from "./SpeedLight";
import * as THREE from "three";

const ParticleSystem: FC = () => {
  const [particles] = useState<{ position: THREE.Vector3 }[]>(
    Array.from({ length: 100 }, () => ({
      position: new THREE.Vector3(0, 0, 0),
    }))
  );

  return (
    <>
      {particles.map((particle, index) => (
        <Particle key={index} position={particle.position} />
      ))}
    </>
  );
};

export default ParticleSystem;
