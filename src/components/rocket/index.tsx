import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import model from "./models/rocket.fbx";
import texture from "./textures/rocket1.jpg";
import { Physics } from "@react-three/rapier";
import Rocket from "./components/Ship";
import Asteroid from "./components/Asteroid";
import AsteroidProvider from "./components/AsteroidProvider";
import Floor from "./components/Floor";

const Space: FC = () => {
  return (
    <Canvas>
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
        <Physics gravity={[0, -1, 0]} interpolate={false} colliders={"hull"}>
          <Rocket url={model} textureUrl={texture} />
          <Asteroid />
          <Floor />
        </Physics>
      </AsteroidProvider>
    </Canvas>
  );
};

export default Space;
