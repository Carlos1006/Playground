import {
  SIDE_COMPENSATION,
  BASE_WIDTH,
  BASE_HEIGHT,
  BASE_DEPTH,
} from "../constants";

const Base = (): JSX.Element => {
  return (
    <mesh
      position={[SIDE_COMPENSATION, 0, SIDE_COMPENSATION]}
      scale={[1, 1, 1]}
    >
      <boxGeometry
        args={[
          BASE_WIDTH + SIDE_COMPENSATION,
          BASE_HEIGHT,
          BASE_DEPTH + SIDE_COMPENSATION,
        ]}
      />
      <meshPhongMaterial color={"rgb(45,45,45)"} />
    </mesh>
  );
};

export default Base;
