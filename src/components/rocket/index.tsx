import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import model from "./models/rocket.fbx";
import { Physics } from "@react-three/rapier";
import Rocket from "./components/Rocket";
import AsteroidProvider from "./components/AsteroidProvider";
import Floor from "./components/Floor";
import Stars from "./components/Stars";
import Asteroids from "./components/Asteroids";
import { ISpaceRocket } from "./types";
// import AnimatedParticles from "./components/AnimatedParticles";
// import { Stars } from "@react-three/drei";
// import { OrthographicCamera } from "@react-three/drei";
// import Effects from "./components/Effects";

const SpaceRocket: FC<ISpaceRocket> = ({
  asteroidScale = 1,
  asteroidCount = 10000,
  asteroidRange = [-50, 50],
}: ISpaceRocket) => {
  return (
    <Canvas
      // onCreated={({ gl, size, camera }) => {
      //   gl.setClearColor(new THREE.Color("white"));
      // }}
      eventSource={document.getElementById("root") as HTMLElement} // Specifies the DOM element to listen for pointer events
      eventPrefix="page" // The event prefix that is cast into canvas pointer x/y events
    >
      {/* <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={150} /> */}
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
          <Asteroids />
          <Floor show={false} />
        </Physics>
      </AsteroidProvider>
      <Stars
        count={asteroidCount}
        scale={asteroidScale}
        range={asteroidRange}
      />
    </Canvas>
  );
};

export default SpaceRocket;
