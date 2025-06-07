import { Html } from "@react-three/drei";
import css from "./../styles/main.module.scss";
import { CSSProperties, FC } from "react";
import { ITooltip } from "../types";

const Tooltip: FC<ITooltip> = ({ color, name, country }: ITooltip) => {
  return (
    <mesh>
      <Html position={[0, 0, -0.1]} color="transparent">
        <div
          className={css.tooltip}
          style={{ "--tooltip": color } as CSSProperties}
        >
          <span>{name}</span>
          <br />
          <span>{country}</span>
        </div>
      </Html>
    </mesh>
  );
};

export default Tooltip;
