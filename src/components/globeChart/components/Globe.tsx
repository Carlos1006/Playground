import { OrbitControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { FC, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import "../material/index";
import { IGlobeMonoChromatic, IOrbitControl, MeshRef } from "../types";
import fillSrc from "../assets/fill.png";
import cloudSrc from "../assets/2k_earth_clouds.jpg";
import fragmentCode from "../shaders/fragment.glsl?raw";
import vertexCode from "../shaders/vertex.glsl?raw";
import { createCanvasTexture, createHexagonTextureBricked } from "../utils";

const GlobeMonochromatic: FC<IGlobeMonoChromatic> = ({
  background,
  land,
  outline,
}: IGlobeMonoChromatic) => {
  const earthMesh = useRef<MeshRef>();
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const orbitRef = useRef<unknown | null>(null);
  const fillTexture = useLoader(THREE.ImageLoader, fillSrc);
  const hexTexture = useMemo(
    () =>
      createHexagonTextureBricked(
        Array.isArray(fillTexture) ? fillTexture[0] : fillTexture
      ),
    [fillTexture]
  );

  const texture = useLoader(
    THREE.TextureLoader,
    createCanvasTexture().image.toDataURL()
  );

  const cloudMesh = useRef<MeshRef>();
  const cloudTexture = useLoader(THREE.TextureLoader, cloudSrc);

  useEffect(() => {
    // Ajusta ligeramente la posición de la cámara en el eje Y al inicio
    if (orbitRef.current) {
      const orbitRefTyped = orbitRef.current as unknown as IOrbitControl;
      orbitRefTyped.target.set(0, 0.2, 0); // Cambia el valor "0.5" para ajustar el paneo
    }
  }, []);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uLandColor.value = land;
    }
  });

  const uniforms = {
    uFillTexture: { value: hexTexture },
    uLandColor: { value: land },
    uAnotherTexture: { value: texture },
  };

  return (
    <>
      <ambientLight intensity={0.3} />
      <OrbitControls
        autoRotate={true}
        autoRotateSpeed={1}
        ref={(ref): void => {
          orbitRef.current = ref;
        }}
      />
      {[
        [3, 2, 0],
        [-3, -2, 1],
        [0, 3, -2],
      ].map((pos, i) => (
        <pointLight
          key={i}
          position={pos as unknown as THREE.Vector3}
          intensity={10}
          color="white"
          distance={5}
          castShadow
          receiveShadow
        />
      ))}

      <hemisphereLight args={["rgb(128,128,128)", "rgb(84,85,255)", 7]} />

      <mesh
        scale={[1.001, 1.001, 1.001]}
        ref={(ref): void => {
          earthMesh.current = ref;
        }}
      >
        <icosahedronGeometry args={[2, 30]} />
        <shaderMaterial
          transparent
          uniforms={uniforms}
          vertexShader={vertexCode}
          fragmentShader={fragmentCode}
          ref={(ref): void => {
            materialRef.current = ref;
          }}
          key={`${background}-${land}-${outline}`}
          depthWrite={false}
        />
      </mesh>

      <mesh
        scale={[1.02, 1.02, 1.02]}
        ref={(ref): void => {
          cloudMesh.current = ref;
        }}
      >
        <icosahedronGeometry args={[2, 5]} />
        <meshStandardMaterial
          opacity={0}
          {...(cloudTexture
            ? {
                map: Array.isArray(cloudTexture)
                  ? cloudTexture[0]
                  : cloudTexture,
              }
            : {})}
          blending={THREE.AdditiveBlending} // Define el modo de fusión
          transparent={true} // Necesario para que el blending funcione
        />
      </mesh>

      <mesh
        scale={[1, 1, 1]}
        ref={(ref): void => {
          earthMesh.current = ref;
        }}
        receiveShadow
        castShadow
      >
        <icosahedronGeometry args={[2, 30]} />
        <gradientMaterial attach="material" />
      </mesh>
    </>
  );
};

export default GlobeMonochromatic;
