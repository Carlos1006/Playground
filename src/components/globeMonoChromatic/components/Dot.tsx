import { useThree, useFrame } from "@react-three/fiber";
import { FC, useRef, useState } from "react";
import * as THREE from "three";
import { IDot, MeshRef } from "../types";
import Tooltip from "./Tooltip";

const Dot: FC<IDot> = ({ position, city }) => {
  const meshRef = useRef<MeshRef>(null);
  const { camera, scene } = useThree();
  const [isVisible, setIsVisible] = useState(false);
  const raycaster = new THREE.Raycaster();

  // Verifica la visibilidad en cada cuadro
  useFrame(() => {
    if (meshRef.current && camera) {
      const cameraPosition = camera.position.clone();
      const targetPosition = meshRef.current.position.clone();
      // const distance = cameraPosition.distanceTo(meshRef.current.position);

      // Configura el raycast desde la cámara hacia el objeto
      const direction = targetPosition.sub(cameraPosition).normalize();
      raycaster.set(cameraPosition, direction);

      // Realiza la intersección y verifica si el primer objeto es el 'Dot'
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0 && intersects[0].object === meshRef.current) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  });

  const { fixColor } = city;

  return (
    <mesh position={position} ref={meshRef}>
      <sphereGeometry args={[0.02, 32, 32]} />
      <meshPhongMaterial
        emissive={fixColor}
        emissiveIntensity={isVisible ? 50 : 10}
        color={fixColor}
      />
      {isVisible && <Tooltip position={position} {...city} />}
    </mesh>
  );
};

export default Dot;
