import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import fragmentShader from "./fragmentDisk.glsl?raw";
import vertexShader from "./vertexDisk.glsl?raw";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

function ConcentricRings({ numSegments = 5, minRadius = 1, maxRadius = 5 }) {
  const deltaRadius = (maxRadius - minRadius) / numSegments;

  return (
    <>
      {Array.from({ length: numSegments }).map((_, i) => {
        const innerRadius = minRadius + i * deltaRadius;
        const outerRadius = innerRadius + deltaRadius;

        return (
          <mesh rotation={[Math.PI / 2, 0, 0]} key={i}>
            <ringGeometry args={[innerRadius, outerRadius, 64]} />
            <meshBasicMaterial
              color={`hsl(${(i * 360) / numSegments}, 100%, 50%)`}
              side={THREE.DoubleSide}
              wireframe
            />
          </mesh>
        );
      })}
    </>
  );
}


// Define el material con shaders
const ParaboloidMaterial = shaderMaterial(
  {
    a: 1.0, // Parámetro a de la paraboloide
    b: 1.0, // Parámetro b de la paraboloide
  },
  `
  varying vec3 vPosition;
  uniform float a;
  uniform float b;

  void main() {
    vec3 pos = position;
    pos.z = (pos.x * pos.x) / (a * a) - (pos.y * pos.y) / (b * b);
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  `
  varying vec3 vPosition;

  void main() {
    gl_FragColor = vec4(0.5 + 0.5 * normalize(vPosition), 1.0);
  }
  `
);

extend({ UnrealBloomPass, ParaboloidMaterial });


// Extiende el material para que pueda ser utilizado como un nodo JSX

const ParaboloidMesh = ({ a = 2, b = 2 }) => {
  const materialRef = useRef();

  // Opcional: puedes animar los parámetros si lo deseas
  useFrame(() => {
    materialRef.current.uniforms.a.value = a;
    materialRef.current.uniforms.b.value = b;
  });

  return (
    <mesh scale={[0.3,0.3,0.3]}>
      {/* Usa una geometría simple que actúe como base */}
      <ringGeometry args={[0, 10, 64, 64, 6.28,6.28]} />
      <paraboloidMaterial ref={materialRef} a={a} b={b} wireframe/>
    </mesh>
  );
};

function Scene() {
  const [audioAnalyser, setAudioAnalyser] = useState(null);
  const mesh = useRef();

  const speed = 0.5;
  const colorA = "#3f3089";
  const colorB = "#00bcff";
  const intensity = 0.08;
  const particalSize = 27;

  const uniforms = useMemo(() => {
    return {
      u_time: {
        value: 0.0,
      },
      u_speed: {
        value: speed,
      },
      u_intensity: {
        value: intensity,
      },
      u_partical_size: {
        value: particalSize,
      },
      u_color_a: {
        value: new THREE.Color(colorA),
      },
      u_color_b: {
        value: new THREE.Color(colorB),
      },
      u_frequency: {
        value: 0.0,
      }
    };
  }, [speed, intensity, particalSize, colorA, colorB]);

  useFrame((state) => {
    const { clock } = state;
    if(audioAnalyser) {
      const frequency = Math.round(audioAnalyser.getAverageFrequency());
      if (frequency > 15) {
        mesh.current.material.uniforms.u_frequency.value = frequency;
      } else {
        mesh.current.material.uniforms.u_frequency.value = 15;
      }
    }
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.u_speed.value = speed;
    mesh.current.material.uniforms.u_intensity.value = intensity;
    mesh.current.material.uniforms.u_partical_size.value = particalSize;
    mesh.current.material.uniforms.u_color_a.value = new THREE.Color(colorA);
    mesh.current.material.uniforms.u_color_b.value = new THREE.Color(colorB);
  });
  

  useEffect(()=> {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        const listener = new THREE.AudioListener();
        // camera.add(listener);

        // Crear un sonido desde el micrófono
        const sound = new THREE.Audio(listener);
        const audioContext = listener.context;

        // Conectar el micrófono al audio
        const mediaStreamSource = audioContext.createMediaStreamSource(stream);
        sound.setNodeSource(mediaStreamSource); // Conectamos la fuente del micrófono

        // Asignar el analyser globalmente
        const analyser = new THREE.AudioAnalyser(sound, 32);
        setAudioAnalyser(analyser);

        // Ahora puedes usar analyser fuera de esta función
      })
      .catch(function (err) {
        console.error("No se pudo acceder al micrófono:", err);
      });
    return () => {
      // if(audioAnalyser){
      //   audioAnalyser.dispose();
      // }
    }
  }, []);


    const numSegments = 5;
    const minRadius = 1;
    const maxRadius = 5;
    const deltaRadius = (maxRadius - minRadius) / numSegments;

  return (
    <>
      <color args={["#000000"]} attach="background" />
      <OrbitControls autoRotate={true} autoRotateSpeed={1} />
      <ambientLight />
      <points scale={0} ref={mesh}>
        <icosahedronGeometry args={[2, 30]} />
        <shaderMaterial
          uniforms={uniforms}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      {/* <group rotation={[0,0,degToRad(45)]}>
        <ConcentricRings numSegments={32} minRadius={0} maxRadius={5} />
      </group> */}
      <ParaboloidMesh a={5} b={4} />
      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <unrealBloomPass threshold={0.5} strength={0.4} radius={0.8} />
      </EffectComposer>
    </>
  );
}

export default function Example() {
  return (
    <Canvas camera={{ position: [8, 0, 0] }}>
      <Scene />
    </Canvas>
  );
}
