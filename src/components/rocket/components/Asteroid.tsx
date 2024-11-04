import { useFrame } from "@react-three/fiber";
import { FC, useMemo, useRef } from "react";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import useAsteroidContext from "../hooks/useAsteroidContext";
import { IAsteroid } from "../types";
import { EMPTY_FUNCTION } from "../constants";

const Asteroid: FC<IAsteroid> = ({
  position = new THREE.Vector3(0, 3, 0),
  setRef = EMPTY_FUNCTION,
}: IAsteroid) => {
  const ref = useRef<THREE.Group>(null);
  const { fbx } = useAsteroidContext();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  const scale = 0.002;
  const vector = useMemo(() => new THREE.Vector3(scale, scale, scale), [scale]);
  const object = useMemo(() => (fbx ? fbx.clone() : null), [fbx]);

  return (
    <RigidBody
      position={position}
      ref={(ref): void => {
        setRef(ref);
      }}
      enabledTranslations={[true, true, false]}
    >
      <group ref={ref} scale={vector}>
        {object && <primitive object={object} />}
      </group>
    </RigidBody>
  );
};

export default Asteroid;
