import { FC, useRef } from "react";
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

const Bar: FC<IBar> = ({ slotX, slotY, value }: IBar) => {
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

  return (
    <mesh
      castShadow
      receiveShadow
      position={[x + SIDE_COMPENSATION, y, z + SIDE_COMPENSATION]}
      scale={[1, 1, 1]}
      ref={ref}
    >
      <boxGeometry args={[SIDE, value, SIDE]} />
      <meshPhongMaterial
        color={color}
        emissive={0x000000}
        specular={0x111111}
        shininess={30}
        refractionRatio={0.98}
        reflectivity={1}
      />
    </mesh>
  );
};

export default Bar;
