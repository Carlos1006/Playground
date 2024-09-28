import { FC } from "react";
import { RigidBody } from "@react-three/rapier";
import { degToRad } from "three/src/math/MathUtils.js";

const Floor: FC = () => {
  return (
    <RigidBody
      type="fixed"
      position={[0, -2, 0]}
      rotation={[degToRad(90), 0, 0]}
    >
      <mesh receiveShadow>
        <planeGeometry args={[100, 100, 500, 500]} />
        <meshStandardMaterial color="rgb(1,1,1)" opacity={1} wireframe />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
