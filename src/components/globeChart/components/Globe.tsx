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
import { CITIES } from "../constants";

function getTowerTransform(
  radius: number,
  lat: number,
  lon: number,
  height: number
): {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
} {
  // lat y lon en grados
  const phi = (90 - lat) * (Math.PI / 180); // latitud a phi
  const theta = (lon + 180) * (Math.PI / 180); // longitud a theta

  // Posición sobre la esfera
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  // Normal en ese punto
  const normal = new THREE.Vector3(x, y, z).normalize();

  // Quaternion para alinear el cilindro con la normal
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0), // eje Y del cilindro
    normal
  );

  // Posición base de la torre (en la superficie)
  const base = new THREE.Vector3(x, y, z);

  // Para que la torre salga desde la superficie, hay que moverla la mitad de la altura hacia afuera
  const position = base.clone().add(normal.clone().multiplyScalar(height / 2));

  return { position, quaternion };
}

function getHexCentersOnSphereBricked(
  radius: number,
  rows: number,
  baseCols: number
): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
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

function interpolateColor(color1: string, color2: string, t: number): string {
  // color1 y color2 en formato "rgb(r,g,b)"
  const parse = (c: string): number[] =>
    c.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
  const [r1, g1, b1] = parse(color1);
  const [r2, g2, b2] = parse(color2);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${b})`;
}

const GlobeMonochromatic: FC<IGlobeMonoChromatic> = ({
  land,
}: IGlobeMonoChromatic) => {
  const earthMesh = useRef<MeshRef>();
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const orbitRef = useRef<unknown | null>(null);
  const fillTexture = useLoader(THREE.ImageLoader, fillSrc);
  const landTextureRaw = useLoader(THREE.ImageLoader, fillSrc); // Usa tu textura de tierra

  const landTexture = Array.isArray(landTextureRaw)
    ? landTextureRaw[0]
    : landTextureRaw;

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
    if (!landTexture) return null;
    const canvas = document.createElement("canvas");
    canvas.width = landTexture.width;
    canvas.height = landTexture.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(landTexture, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return {
      canvas,
      ctx,
      width: canvas.width,
      height: canvas.height,
      data: imageData.data,
    };
  }, [landTexture]);

  const hexCenters = useMemo(
    //   () => getHexCentersOnSphereBricked(2.04, 220, 320),
    () => getHexCentersOnSphereBricked(2.04, 280, 380),
    []
  );

  const filteredHexes = useMemo(() => {
    if (!landSample) return [];
    const offsetDegrees = 0;
    const offset = (offsetDegrees * Math.PI) / 180;
    const hexes = [];
    for (let i = 0; i < hexCenters.length; i++) {
      const pos = hexCenters[i];
      const normal = pos.clone().normalize();
      const uRaw =
        0.5 + (Math.atan2(normal.z, normal.x) + offset) / (2 * Math.PI);
      const u = ((uRaw % 1) + 1) % 1;
      const v = 0.5 - Math.asin(normal.y) / Math.PI;
      const x = Math.floor((1 - u) * (landSample.width - 1));
      const y = Math.floor(v * (landSample.height - 1));
      const idxPx = (y * landSample.width + x) * 4;
      const alpha = landSample.data[idxPx + 3];
      if (alpha > 1) {
        // Guarda posición y rotación (quaternion)
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          normal
        );
        hexes.push({ pos, quaternion });
      }
    }
    return hexes;
  }, [landSample, hexCenters]);

  console.log("Land Sample:", filteredHexes);

  const instancedRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!instancedRef.current) return;
    const dummy = new THREE.Object3D();
    filteredHexes.forEach((hex, i) => {
      dummy.position.copy(hex.pos);
      dummy.quaternion.copy(hex.quaternion);
      dummy.updateMatrix();
      instancedRef.current?.setMatrixAt(i, dummy.matrix);
    });
    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, [filteredHexes]);

  return (
    <>
      {CITIES.map(({ latitude, longitude, value, color, fixColor }, i) => {
        // !const numCubes = Math.max(1, Math.round(value)); // Usa tu valor para la altura
        const base = getTowerTransform(2.04, latitude, longitude, 0); // altura 0 para base
        const normal = base.position.clone().normalize();
        const cubeHeight = 0.02; // altura de cada cubo
        const gap = 0.004; // separación entre cubos

        const cityColor = color; // de la ciudad
        const cityFixColor = fixColor; // de la ciudad

        // --- NUEVO: parámetros para el grid circular ---
        // !const numRings = 5; // cantidad de anillos alrededor
        const towersPerRing = 10; // torres por anillo
        const ringSpacing = 0.03; // distancia radial entre anillos

        const numCubes = Math.max(1, Math.round(value)); // Usa tu valor para la altura
        const numRings = Math.max(1, Math.floor(numCubes / 2)); // Al menos 1 anillo, más si la barra central es más alta

        // Función para calcular posiciones en círculo alrededor de la base
        function getCirclePositions(
          center: THREE.Vector3,
          normal: THREE.Vector3,
          radius: number,
          count: number,
          ringIdx: number // <-- nuevo parámetro
        ): THREE.Vector3[] {
          const up = new THREE.Vector3(0, 1, 0);
          let tangent = new THREE.Vector3().crossVectors(normal, up);
          if (tangent.lengthSq() < 0.001) tangent = new THREE.Vector3(1, 0, 0);
          tangent.normalize();
          const bitangent = new THREE.Vector3()
            .crossVectors(normal, tangent)
            .normalize();

          const positions: THREE.Vector3[] = [];
          // Offset angular único para cada anillo (puedes usar PI*ringIdx/numRings o Math.random())
          const angleOffset = (Math.PI * 2 * ringIdx) / count + ringIdx * 0.37;
          for (let k = 0; k < count; k++) {
            const angle = (2 * Math.PI * k) / count + angleOffset;
            const offset = tangent
              .clone()
              .multiplyScalar(Math.cos(angle) * radius)
              .add(bitangent.clone().multiplyScalar(Math.sin(angle) * radius));
            positions.push(center.clone().add(offset));
          }
          return positions;
        }

        // --- FIN NUEVO ---

        return (
          <group key={i}>
            {/* Torre central */}
            {Array.from({ length: numCubes }).map((_, j) => {
              const position = base.position
                .clone()
                .add(
                  normal.clone().multiplyScalar((cubeHeight + gap) * (j + 0.5))
                );
              return (
                <mesh
                  key={`main-${j}`}
                  position={position}
                  quaternion={base.quaternion}
                >
                  <boxGeometry args={[0.03, cubeHeight, 0.03]} />
                  <meshStandardMaterial color={fixColor} />
                </mesh>
              );
            })}

            {/* Torres en grid circular */}
            {Array.from({ length: numRings }).flatMap((_, ringIdx) => {
              const ringRadius = ringSpacing * (ringIdx + 1);
              const positions = getCirclePositions(
                base.position,
                normal,
                ringRadius,
                towersPerRing,
                ringIdx
              );
              // Parámetros de la gaussiana
              const sigma = numRings / 2; // ancho de la campana
              const mu = 0; // centro en el anillo central (puedes ajustar)
              // Calcula el factor gaussiano para este anillo
              const gauss = Math.exp(
                -0.5 * Math.pow((ringIdx - mu) / sigma, 2)
              );
              // Calcula el número de cubos para este anillo (mínimo 1)
              const numCubesRing =
                Math.max(1, Math.floor(numCubes * gauss)) - 2;
              return positions.map((pos, idx) => {
                // Ruido: valor entre -1 y 1, escalado (ajusta 1.5 para más/menos variación)
                const noise = (Math.random() - 0.5) * 5;
                const cubesWithNoise = Math.max(
                  1,
                  Math.floor(numCubesRing + noise)
                );
                return Array.from({ length: cubesWithNoise }).map((_, j) => {
                  const stackPos = pos
                    .clone()
                    .add(
                      normal
                        .clone()
                        .multiplyScalar((cubeHeight + gap) * (j + 0.5))
                    );
                  const t = ringIdx === 0 ? 0.2 : 1 - gauss;

                  const interpColor = interpolateColor(
                    cityFixColor,
                    cityColor,
                    t
                  );

                  return (
                    <mesh
                      key={`ring-${ringIdx}-${idx}-stack-${j}`}
                      position={stackPos}
                      quaternion={base.quaternion}
                    >
                      <boxGeometry args={[0.03, cubeHeight, 0.03]} />
                      <meshStandardMaterial color={interpColor} />
                    </mesh>
                  );
                });
              });
            })}
          </group>
        );
      })}

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
        // scale={[1.03, 1.03, 1.03]}
        scale={[0, 0, 0]}
        rotation={[0, (-180 * Math.PI) / 180, 0]}
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
          key={`shaderMaterial-${land}`}
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

      {landSample && filteredHexes.length > 0 && (
        <instancedMesh
          ref={instancedRef}
          args={[undefined, undefined, filteredHexes.length]}
          frustumCulled={false}
        >
          <circleGeometry args={[0.012, 6]} />
          <meshStandardMaterial color="rgb(252, 97, 8)" />
        </instancedMesh>
      )}

      <mesh
        // scale={[1,1,1]}
        scale={[1.02, 1.02, 1.02]}
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
