import { FC, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import model from "./models/rocket.fbx";
import { Physics } from "@react-three/rapier";
import Rocket from "./components/ShipMouse";
import * as THREE from "three";
import Asteroid from "./components/Asteroid";
import AsteroidProvider from "./components/AsteroidProvider";
import Floor from "./components/Floor";
import { OrthographicCamera } from "@react-three/drei";

const Space: FC = () => {
  const [positions, setPositions] = useState<THREE.Vector3[]>([]);

  useEffect(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 10 - 5;
      const y = Math.random() * 10 - 5;
      positions.push(new THREE.Vector3(x, y, 0));
    }
    setPositions(positions);
  }, []);

  return (
    <Canvas
      eventSource={document.getElementById("root") as HTMLElement} // Specifies the DOM element to listen for pointer events
      eventPrefix="page" // The event prefix that is cast into canvas pointer x/y events
    >
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={150} />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <AsteroidProvider>
        <Physics gravity={[0, 0, 0]} interpolate={false} colliders={"hull"}>
          <Rocket url={model} />
          <Asteroid />
          {positions.map((position, index) => (
            <Asteroid key={index} position={position} />
          ))}
          <Floor />
        </Physics>
      </AsteroidProvider>
    </Canvas>
  );
};

export default Space;
