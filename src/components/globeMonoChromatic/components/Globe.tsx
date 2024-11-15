import { OrbitControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { FC, useEffect, useMemo, useRef } from "react";
import { TextureLoader } from "three";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fragmentCode from "../shaders/fragment.glsl?raw";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vertexCode from "../shaders/vertex.glsl?raw";

import fillSrc from "../assets/fill.png";
import strokeSrc from "../assets/stroke.png";
import { getPosition } from "../utils";
import { CITIES } from "../constants";
import { IGlobeMonoChromatic, IOrbitControl, MeshRef } from "../types";
import Dot from "./Dot";

const GlobeMonochromatic: FC<IGlobeMonoChromatic> = ({
  background,
  land,
  outline,
}: IGlobeMonoChromatic) => {
  const earthMesh = useRef<MeshRef>();
  const fillTexture = useLoader(TextureLoader, fillSrc);
  const strokeTexture = useLoader(TextureLoader, strokeSrc);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const positions = useMemo(() => {
    return CITIES.map(({ latitude, longitude }) => {
      return getPosition(latitude, longitude, 2);
    });
  }, []);

  const uniforms = {
    uFillTexture: { value: fillTexture },
    uStrokeTexture: { value: strokeTexture },
    uBackgroundColor: { value: background },
    uLandColor: { value: land },
    uOutlineColor: { value: outline },
  };

  const orbitRef = useRef<unknown | null>(null);

  useEffect(() => {
    // Ajusta ligeramente la posición de la cámara en el eje Y al inicio
    if (orbitRef.current) {
      const orbitRefTyped = orbitRef.current as unknown as IOrbitControl;
      orbitRefTyped.target.set(0, 0.2, 0); // Cambia el valor "0.5" para ajustar el paneo
    }
  }, []);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uBackgroundColor.value = background;
      materialRef.current.uniforms.uLandColor.value = land;
      materialRef.current.uniforms.uOutlineColor.value = outline;
    }
  });

  return (
    <>
      <ambientLight />
      <OrbitControls
        autoRotate={false}
        autoRotateSpeed={1}
        ref={(ref): void => {
          orbitRef.current = ref;
        }}
      />
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
          ref={(ref): void => {
            materialRef.current = ref;
          }}
          key={`${background}-${land}-${outline}`}
          // depthWrite={false}
        />
        {positions.map((position, index) => (
          <Dot key={index} position={position} city={CITIES[index]} />
        ))}
      </mesh>
    </>
  );
};

export default GlobeMonochromatic;
