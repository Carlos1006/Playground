import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { FC, useRef } from "react";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
  TextureLoader,
} from "three";
import * as THREE from "three";

import earthSrc from "./assets/2k_earth_daymap.jpg";
import cloudSrc from "./assets/2k_earth_clouds.jpg";
import normalSrc from "./assets/2k_earth_normal_map.jpg";
import specularSrc from "./assets/2k_earth_specular_map.jpg";

type MeshRef = Mesh<
  BufferGeometry<NormalBufferAttributes>,
  Material | Material[],
  Object3DEventMap
> | null;

const Globe: FC = () => {
  const earthMesh = useRef<MeshRef>();
  const cloudMesh = useRef<MeshRef>();
  const earthTexture = useLoader(TextureLoader, earthSrc);
  const cloudTexture = useLoader(TextureLoader, cloudSrc);
  const normalTexture = useLoader(TextureLoader, normalSrc);
  const specularTexture = useLoader(TextureLoader, specularSrc);

  // const material = new THREE.ShaderMaterial({
  //   uniforms: {
  //     uBaseTexture: { value: earthTexture },
  //     uLightenTexture: { value: cloudTexture },
  //   },
  //   vertexShader: `
  //     varying vec2 vUv;
  //     void main() {
  //       vUv = uv;
  //       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  //     }
  //   `,
  //   fragmentShader: `
  //     uniform sampler2D uBaseTexture;
  //     uniform sampler2D uLightenTexture;
  //     varying vec2 vUv;

  //     void main() {
  //       vec4 baseColor = texture2D(uBaseTexture, vUv);
  //       vec4 lightenColor = texture2D(uLightenTexture, vUv);

  //       // Modo lighten: elige el color más claro de cada canal
  //       gl_FragColor = vec4(
  //         max(baseColor.r, lightenColor.r),
  //         max(baseColor.g, lightenColor.g),
  //         max(baseColor.b, lightenColor.b),
  //         1.0 // Opacidad total
  //       );
  //     }
  //   `,
  // });

  useFrame(() => {
    if (cloudMesh.current) {
      cloudMesh.current.rotation.y -= 0.0005;
      // cloudMesh.current.rotation.x -= 0.0004;
      // cloudMesh.current.rotation.z += 0.0003;
    }
  });

  return (
    <>
      {/* <color args={["#000000"]} attach="background" /> */}
      <ambientLight />
      <OrbitControls autoRotate={true} autoRotateSpeed={1} />
      <mesh
        scale={[1, 1, 1]}
        ref={(ref): void => {
          earthMesh.current = ref;
        }}
        // material={material}
      >
        <icosahedronGeometry args={[2, 5]} />
        <meshLambertMaterial // meshPhongMaterial
          {...(earthTexture
            ? {
                map: Array.isArray(earthTexture)
                  ? earthTexture[0]
                  : earthTexture,
              }
            : {})}
          normalMap={
            Array.isArray(normalTexture) ? normalTexture[0] : normalTexture
          }
          specularMap={
            Array.isArray(specularTexture)
              ? specularTexture[0]
              : specularTexture
          }
          color={"rgb(240,240,240)"}
          wireframe={false}
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
    </>
  );
};

export const GlobeCanvas: FC = () => {
  return (
    <Canvas camera={{ position: [4, 0, 0] }}>
      <Globe />
    </Canvas>
  );
};

export default GlobeCanvas;
