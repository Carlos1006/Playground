import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { FC, useMemo, useRef } from "react";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
  TextureLoader,
} from "three";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fragmentCode from "./shaders/fragment.glsl?raw";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vertexCode from "./shaders/vertex.glsl?raw";

import fillSrc from "./assets/fill.png";
import strokeSrc from "./assets/stroke.png";
import css from "./styles/main.module.scss";
import { getPosition } from "./utils";

const monterrey: [number, number] = [25.6802019, -100.315258];
const tokyo: [number, number] = [35.652832, 139.839478];
const newYork: [number, number] = [40.712776, -74.005974];
const puertoRico: [number, number] = [18.465539, -66.105735];
const benalmadena: [number, number] = [36.5987, -4.516];
const sydney: [number, number] = [-33.8688, 151.2093];
const kinshasa: [number, number] = [-4.4419, 15.2663];
const shanghai: [number, number] = [31.2304, 121.4737];
const honolulu: [number, number] = [21.3069, -157.8583];
const nullIsland: [number, number] = [0, 0];
const CITIES = [
  monterrey,
  tokyo,
  newYork,
  puertoRico,
  benalmadena,
  sydney,
  kinshasa,
  shanghai,
  honolulu,
  nullIsland,
];

type MeshRef = Mesh<
  BufferGeometry<NormalBufferAttributes>,
  Material | Material[],
  Object3DEventMap
> | null;

const GlobeMonochromatic: FC = () => {
  const earthMesh = useRef<MeshRef>();
  const cloudMesh = useRef<MeshRef>();
  const fillTexture = useLoader(TextureLoader, fillSrc);
  const strokeTexture = useLoader(TextureLoader, strokeSrc);

  const uniforms = {
    uFillTexture: { value: fillTexture },
    uStrokeTexture: { value: strokeTexture },
    uMonterrey: { value: getPosition(...monterrey, 2) },
  };

  useFrame(() => {
    if (cloudMesh.current) {
      cloudMesh.current.rotation.y -= 0.0005;
      // cloudMesh.current.rotation.x -= 0.0004;
      // cloudMesh.current.rotation.z += 0.0003;
    }
  });

  const positions = useMemo(() => {
    return CITIES.map(([latitude, longitude]) => {
      return getPosition(latitude, longitude, 2);
    });
  }, []);

  return (
    <>
      {/* <color args={["#000000"]} attach="background" /> */}
      <ambientLight />
      <OrbitControls autoRotate={false} autoRotateSpeed={1} />
      <mesh
        scale={[1, 1, 1]}
        ref={(ref): void => {
          earthMesh.current = ref;
        }}
      >
        <icosahedronGeometry args={[2, 5]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexCode}
          fragmentShader={fragmentCode}
          // depthWrite={false}
        />

        {positions.map((position, index) => (
          <mesh key={index} position={position}>
            <sphereGeometry args={[0.02, 32, 32]} />
            <meshBasicMaterial color="blue" />
          </mesh>
        ))}
      </mesh>
    </>
  );
};

export const GlobeCanvasMonochromatic: FC = () => {
  return (
    <Canvas camera={{ position: [4, 0, 0] }} className={css.canvas}>
      <GlobeMonochromatic />
    </Canvas>
  );
};

export default GlobeCanvasMonochromatic;
