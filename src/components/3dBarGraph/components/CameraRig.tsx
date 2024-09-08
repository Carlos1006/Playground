import { useFrame } from "@react-three/fiber";
import { FC } from "react";
import { ICameraRig } from "../types";

const CameraRig: FC<ICameraRig> = ({ fov }: ICameraRig) => {
  useFrame((state) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    // console.log(state, orbit);
    camera.fov = fov;
    camera.updateProjectionMatrix();
  });
  return <></>;
};

export default CameraRig;
