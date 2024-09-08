import { FC, useState } from "react";
import BarGraph3D from "../components/3dBarGraph";
import css from "../styles/page.module.scss";

const Page_13: FC = () => {
  const [fovValue, setFovValue] = useState<number>(50);

  return (
    <>
      <div className={`${css.page} ${css.black} ${css.relative}`}>
        <BarGraph3D fov={fovValue} />
        <div className={css.controller}>
          <span>FOV</span>
          <input
            type="range"
            min="50"
            max="75"
            onChange={(e): void => setFovValue(Number(e.target.value))}
            value={fovValue}
          />
          <span>{fovValue}</span>
        </div>
      </div>
    </>
  );
};

export default Page_13;
