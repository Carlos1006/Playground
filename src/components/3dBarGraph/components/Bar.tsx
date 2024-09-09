import { FC, useRef, useState } from "react";
import * as THREE from "three";
import {
  HEIGHT_COMPENSATION,
  SIDE,
  AXIS_X,
  AXIS_Z,
  COLORS,
  MAX_VALUE,
  SIDE_COMPENSATION,
} from "../constants";
import { IBar } from "../types";
import { ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { getContrastColor } from "../utils";
import css from "../styles/main.module.scss";

const Bar: FC<IBar> = ({ slotX, slotY, value, onHover }: IBar) => {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x049ef4,
    emissive: 0x000000,
    specular: 0x111111,
    shininess: 30,
    refractionRatio: 0.98,
    reflectivity: 1,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.receiveShadow = true;
  cube.castShadow = true;
  cube.position.y = 0;

  const y = value / 2 - HEIGHT_COMPENSATION;

  const x = (slotX - 1) * SIDE - AXIS_X + SIDE / 2;
  const z = (slotY - 1) * SIDE - AXIS_Z + SIDE / 2;

  const color = COLORS[Math.floor((value / MAX_VALUE) * COLORS.length)];

  const [hover, setHover] = useState(false);

  const handlePointerOver = (event: ThreeEvent<PointerEvent>): void => {
    event.stopPropagation();
    setHover(true);
    onHover(slotX, slotY, true);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>): void => {
    event.stopPropagation();
    setHover(false);
    onHover(slotX, slotY, false);
  };

  return (
    <mesh
      castShadow
      receiveShadow
      position={[x + SIDE_COMPENSATION, y, z + SIDE_COMPENSATION]}
      scale={[1, 1, 1]}
      ref={ref}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry args={[SIDE, value, SIDE]} />
      <meshPhongMaterial
        color={hover ? getContrastColor(color) : color}
        emissive={0x000000}
        specular={0x111111}
        shininess={30}
        refractionRatio={0.98}
        reflectivity={1}
      />
      {hover && (
        <Html>
          {/*  distanceFactor={3} */}
          <div className={css.tooltip}>
            <span>Tooltip Example</span>
            <div>X</div>
            <span>{slotX}</span>
            <div>Y</div>
            <span>{slotY}</span>
            <div>Value</div>
            <span>{value.toFixed(2)}</span>
          </div>
        </Html>
      )}
    </mesh>
  );
};

export default Bar;
