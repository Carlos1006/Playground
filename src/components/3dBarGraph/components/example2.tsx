import { FC, useRef, useState } from "react";
import * as THREE from "three";
import css from "./styles/main.module.scss";
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { IBarGraph3D } from "../types";
import { OrbitControls } from "@react-three/drei";

const Box = (props: ThreeElements["mesh"]): JSX.Element => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const handlePointerOver = (event: THREE.Event): void => {
    event.stopPropagation(); // Detener la propagación del evento
    hover(true);
  };

  const handlePointerOut = (event: THREE.Event): void => {
    event.stopPropagation(); // Detener la propagación del evento
    hover(false);
  };

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta;
  });
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(): void => click(!clicked)}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      raycast={(raycaster, intersects): void => {
        if (!ref.current) return;
        const intersected = raycaster.intersectObject(ref.current, true);
        if (intersected.length > 0) {
          intersects.push(intersected[0]);
        }
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const Cube = (): JSX.Element => {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x049ef4,
    emissive: 0x000000,
    specular: 0x111111,
    shininess: 30,
    refractionRatio: 0.98,
    reflectivity: 1,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.receiveShadow = true;
  cube.castShadow = true;
  cube.position.y = 0;

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.4 * delta;
    ref.current.rotation.y += 0.4 * delta;
  });

  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
      ref={ref}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial
        color={0x049ef4}
        emissive={0x000000}
        specular={0x111111}
        shininess={30}
        refractionRatio={0.98}
        reflectivity={1}
      />
    </mesh>
  );
};

function CameraRig({ fov }: { fov: number }): JSX.Element {
  useFrame((state) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    camera.fov = fov;
    camera.updateProjectionMatrix();
  });
  return <></>;
}

const BarGraph3D: FC<IBarGraph3D> = ({ fov }: IBarGraph3D) => {
  const [showCube, setShowCube] = useState(false);
  return (
    <div className={css.barGraph3D}>
      <span style={{ color: "white" }}>{fov}</span>
      <button onClick={(): void => setShowCube((prev) => !prev)}>
        {showCube ? "hide" : "show"}
      </button>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={Math.PI / 2} />
        <OrbitControls />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        {showCube && <Cube />}
        <CameraRig fov={fov} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default BarGraph3D;
