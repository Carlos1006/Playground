import { FC, useMemo, useRef } from "react";
import * as THREE from "three";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fragmentShader from "../helpers/fireFragment.glsl?raw";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vertexShader from "../helpers/fireVertex.glsl?raw";
import { useFrame } from "@react-three/fiber";
import { IFire } from "../types";

const speed = 0.5;
const colorA = "#3f3089";
const colorB = "#00bcff";
const intensity = 0.2;
const particalSize = 4;

const Fire: FC<IFire> = ({
  position = new THREE.Vector3(0, 0, 0),
  scale = 1,
}) => {
  const mesh = useRef<THREE.Points>(null);

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
      },
    };
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    uniforms.u_time.value = elapsedTime;
  });

  return (
    <points
      scale={[0.5 * scale, 0.3 * scale, 0.5 * scale]}
      position={position}
      ref={mesh}
    >
      <icosahedronGeometry args={[0.3, 30]} />
      <shaderMaterial
        uniforms={uniforms}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Fire;
