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

function getTexturePixel(texture: THREE.Texture, u: number, v: number) {
  const canvas = document.createElement("canvas");
  canvas.width = texture.image.width;
  canvas.height = texture.image.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(texture.image, 0, 0);
  const x = Math.floor(u * (canvas.width - 1));
  const y = Math.floor(v * (canvas.height - 1));
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  return pixel; // [r, g, b, a]
}

function getHexCentersOnSphereBricked(
  radius: number,
  rows: number,
  baseCols: number
) {
  const positions = [];
  for (let i = 0; i < rows; i++) {
    const v = i / (rows - 1); // de 0 a 1
    const phi = Math.PI * v; // de 0 a PI (latitud)
    // Calcula columnas según la latitud (más en el ecuador, menos en los polos)
    const sinPhi = Math.sin(phi);
    const cols = Math.max(3, Math.round(baseCols * sinPhi));
    for (let j = 0; j < cols; j++) {
      // Desfase tipo ladrillo en filas impares
      const offset = i % 2 === 0 ? 0 : (Math.PI * 2) / (2 * cols);
      const u = j / cols;
      const theta = u * Math.PI * 2 + offset; // de 0 a 2PI (longitud)
      // Conversión esférica a cartesiana
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      positions.push(new THREE.Vector3(x, y, z));
    }
  }
  return positions;
}

const GlobeMonochromatic: FC<IGlobeMonoChromatic> = ({
  background,
  land,
  outline,
}: IGlobeMonoChromatic) => {
  const earthMesh = useRef<MeshRef>();
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const orbitRef = useRef<unknown | null>(null);
  const fillTexture = useLoader(THREE.ImageLoader, fillSrc);
  const landTexture = useLoader(THREE.TextureLoader, fillSrc); // Usa tu textura de tierra

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

  const landSample = useMemo(() => {
    if (!landTexture) {
      console.warn("Land texture not loaded yet.");
      return null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = landTexture.width;
    canvas.height = landTexture.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(landTexture, 0, 0);
    return { canvas, ctx, width: canvas.width, height: canvas.height };
  }, [landTexture.image]);

  console.log("Land Sample:", landSample);

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

      {landSample &&
        getHexCentersOnSphereBricked(2.05, 40, 60).map((pos, idx) => {
          const normal = pos.clone().normalize();
          const offsetDegrees = 180; // Cambia este valor para ajustar el meridiano
          const offset = (offsetDegrees * Math.PI) / 180;
          const uRaw =
            0.5 + (Math.atan2(normal.z, normal.x) + offset) / (2 * Math.PI);
          const u = ((uRaw % 1) + 1) % 1; // Corrige el rango de u
          const v = 0.5 - Math.asin(normal.y) / Math.PI;

          let isLand = false;
          if (landSample && landSample.ctx) {
            const x = Math.floor((1 - u) * (landSample.width - 1));
            const y = Math.floor(v * (landSample.height - 1));
            const pixel = landSample.ctx.getImageData(x, y, 1, 1).data;
            if (pixel[3] > 1) {
              isLand = true;
            }
          }

          if (!isLand) return null;

          const quaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            normal
          );
          return (
            <mesh key={idx} position={pos} quaternion={quaternion}>
              <circleGeometry args={[0.08, 6]} />
              <meshStandardMaterial color="#FFD700" transparent opacity={0.7} />
            </mesh>
          );
        })}

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
