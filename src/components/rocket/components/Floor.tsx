import { FC } from "react";
import { RigidBody } from "@react-three/rapier";
import { degToRad } from "three/src/math/MathUtils.js";
import { IFloor } from "../types";

const Floor: FC<IFloor> = ({ show = true }: IFloor) => {
  return (
    <RigidBody
      type="fixed"
      position={[0, -2, 0]}
      rotation={[degToRad(90), 0, 0]}
    >
      <mesh receiveShadow>
        <planeGeometry args={[100, 100, 500, 500]} />
        <meshStandardMaterial
          transparent
          color="rgb(0,0,0)"
          opacity={1}
          wireframe={show}
        />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
