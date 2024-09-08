import { FC, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { IBarGraph3D } from "./types";
import { OrbitControls } from "@react-three/drei";
import Bar from "./components/Bar";
import Base from "./components/Base";
import CameraRig from "./components/CameraRig";
import { Random } from "../../website/web_03/utils";
import {
  CAMERA_INIT_POSITION,
  GROUP,
  MAX_VALUE,
  MIN_VALUE,
  ORBIT_CONTROLS,
  POINT_LIGHT,
  SPOT_LIGHT,
} from "./constants";
import css from "./styles/main.module.scss";

const BarGraph3D: FC<IBarGraph3D> = ({ fov }: IBarGraph3D) => {
  const orbitRef = useRef<unknown>();

  const [gridValues] = useState<number[][]>(() => {
    const gridValues = Array.from({ length: 20 }).map(() =>
      Array.from({ length: 10 }).map(() => Random(MIN_VALUE, MAX_VALUE))
    );
    return gridValues;
  });

  return (
    <div className={css.barGraph3D}>
      <Canvas
        camera={{
          position: CAMERA_INIT_POSITION,
        }}
      >
        <OrbitControls
          ref={orbitRef as never}
          target={ORBIT_CONTROLS.TARGET}
          autoRotate={ORBIT_CONTROLS.AUTO_ROTATE}
          autoRotateSpeed={ORBIT_CONTROLS.AUTO_ROTATE_SPEED}
        />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={SPOT_LIGHT.POSITION}
          intensity={SPOT_LIGHT.INTENSITY}
          penumbra={SPOT_LIGHT.PENUMBRA}
          decay={SPOT_LIGHT.DECAY}
          angle={SPOT_LIGHT.ANGLE}
        />
        <pointLight
          intensity={POINT_LIGHT.INTENSITY}
          position={POINT_LIGHT.POSITION}
          decay={POINT_LIGHT.DECAY}
        />
        <group position={GROUP.POSITION}>
          <Base />
          {Array.from({ length: 20 }).map((_, x) =>
            Array.from({ length: 10 }).map((_, y) => (
              <Bar
                key={`${x}${y}`}
                slotX={x + 1}
                slotY={y + 1}
                value={gridValues[x][y]}
              />
            ))
          )}
        </group>
        <CameraRig fov={fov} orbit={orbitRef} />
      </Canvas>
    </div>
  );
};

export default BarGraph3D;
