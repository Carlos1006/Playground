import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import fragmentShader from "./fragment.glsl?raw";
import vertexShader from "./vertex2.glsl?raw";
import { ParametricGeometry } from 'three-stdlib';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { degToRad, radToDeg } from "three/src/math/MathUtils.js";

extend({ UnrealBloomPass });

function roundedHyperbolicParaboloid(u, v, target) {
  const a = 0.7;
  const b = 0.7;
  const x = (u - 0.5);
  const y = (v - 0.5);
  const z = (x/a)**2 - (y/b)**2;
  target.set(-x, -y, z);
}

function HyperbolicParaboloid({speed = -0.005, rotation}) {
  const meshRef = useRef();

  const geometry = new ParametricGeometry(roundedHyperbolicParaboloid, 100, 100);

  useFrame(() => {
    meshRef.current.rotation.y += speed;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={[2.5,3,2]} rotation={[0,rotation,0]}>
      <meshNormalMaterial wireframe />
    </mesh>
  );
}

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
          depthWrite={false}
        />
      </points>
      <points scale={1.4}>
        <icosahedronGeometry args={[2, 30]} />
        <shaderMaterial
          uniforms={uniforms}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />  
      </points> 
      <group rotation={[0,0,degToRad(45)]}>
        <HyperbolicParaboloid speed={paraboloidSpeeds.current[1]} rotation={0} />
        <HyperbolicParaboloid speed={paraboloidSpeeds.current[2]} rotation={radToDeg(-15)} />
        <HyperbolicParaboloid speed={paraboloidSpeeds.current[3]} rotation={radToDeg(-90)} />
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

export default function Example() {
  return (
    <Canvas camera={{ position: [8, 0, 0] }}>
      <Scene />
    </Canvas>
  );
}
