import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import fragmentShader from "../shaders/fragment.glsl?raw";
import vertexShader from "../shaders/vertex2.glsl?raw";
import vertexDiskShader from "../shaders/vertexDisk.glsl?raw";
import fragmentDiskShader from "../shaders/fragmentDisk.glsl?raw";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { degToRad, radToDeg } from "three/src/math/MathUtils.js";


extend({ UnrealBloomPass });

const ParaboloidMesh = ({ a = 2, b = 2, speed = -0.005, rotation }) => {
  const materialRef = useRef();
  const meshRef = useRef();

  // Opcional: puedes animar los parámetros si lo deseas
  useFrame(() => {
    materialRef.current.uniforms.a.value = a;
    materialRef.current.uniforms.b.value = b;
    meshRef.current.rotation.y += speed;
    meshRef.current.rotation.x += speed / 2;
    meshRef.current.rotation.z += speed / 2;
  });

  return (
    <mesh ref={meshRef} scale={[0.17,0.17,0.17]} rotation={[0,rotation,0]}>
      <ringGeometry args={[0, 10, 64, 64, 6.28,6.28]} />
      <shaderMaterial
          uniforms={{
            a: {value: a},
            b: {value: b}
          }}
          ref={materialRef}
          fragmentShader={fragmentDiskShader}
          vertexShader={vertexDiskShader}
          blending={THREE.NoBlending}
          depthWrite={false}
          wireframe
        />  
    </mesh>
  );
};


function Scene() {
  const [average, setAverage] = useState(0);

  const mesh = useRef();

  const speed = 0.5;
  const colorA = "#3f3089";
  const colorB = "#00bcff";
  const intensity = 0.08;
  const particalSize = 27;

  const paraboloidSpeeds = useRef([-0.005, 0.003, -0.008]);

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
    if(average) {
      const frequency = Math.round(average);
      if (frequency > 5) {
        mesh.current.material.uniforms.u_frequency.value = frequency * 3;
      } else {
        mesh.current.material.uniforms.u_frequency.value = 5;
      }
    }
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.u_speed.value = speed;
    mesh.current.material.uniforms.u_intensity.value = intensity;
    mesh.current.material.uniforms.u_partical_size.value = particalSize;
    mesh.current.material.uniforms.u_color_a.value = new THREE.Color(colorA);
    mesh.current.material.uniforms.u_color_b.value = new THREE.Color(colorB);
  });
  
  useEffect(() => {
    let audioContext;
    let analyser;
    let dataArray;
    let source;
    let rafId;

    const handleSuccess = (stream) => {
      // Crear el contexto de audio y el nodo del analizador
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      const bufferLength = analyser.frequencyBinCount; // Mitad de fftSize
      dataArray = new Uint8Array(bufferLength);

      // Conectar el micrófono al contexto de audio
      source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Función para obtener frecuencias y actualizar el estado
      const updateFrequencies = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAverage(average);
        console.log(average);
        rafId = requestAnimationFrame(updateFrequencies);

      };

      // get average frequency
     

      updateFrequencies(); // Iniciar el ciclo de actualización
    };

    // Solicitar acceso al micrófono
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(handleSuccess)
      .catch((err) => console.error("Error al acceder al micrófono:", err));

    // Limpiar el contexto de audio cuando el componente se desmonta
    return () => {
      if (audioContext) {
        audioContext.close();
      }
      cancelAnimationFrame(rafId); // Detener la actualización de frecuencias
    };
  }, []); // Se ejecuta solo al montar y desmontar el componente

  return (
    <>
      <color args={["#000000"]} attach="background" />
      <OrbitControls autoRotate={true} autoRotateSpeed={1} />
      <ambientLight />
      <points scale={1.5} ref={mesh}>
        <icosahedronGeometry args={[2, 30]} />
        <shaderMaterial
          uniforms={uniforms}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points scale={1.4}>
        <icosahedronGeometry args={[2, 30]} />
        <shaderMaterial
          uniforms={uniforms}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          blending={THREE.AdditiveBlending}
        />  
      </points> 
      <group rotation={[0,0,degToRad(45)]}>
        <ParaboloidMesh a={5} b={4} speed={paraboloidSpeeds.current[1]} rotation={0} />
        <ParaboloidMesh a={5} b={4} speed={paraboloidSpeeds.current[2]} rotation={radToDeg(-15)} />
        <ParaboloidMesh a={5} b={4} speed={paraboloidSpeeds.current[3]} rotation={radToDeg(-90)} />
      </group>
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

export default function OrbCore() {
  return (
    <Canvas camera={{ position: [8, 0, 0] }}>
      <Scene />
    </Canvas>
  );
}
