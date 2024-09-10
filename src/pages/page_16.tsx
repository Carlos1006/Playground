import { FC, useState } from "react";
import BarGraph3D from "../components/3dBarGraph";
import css from "../styles/page.module.scss";

const Page_13: FC = () => {
  const [fov, setFov] = useState<number>(50);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [orthographic, setOrthographic] = useState<boolean>(false);

  return (
    <>
      <div className={`${css.page} ${css.black} ${css.relative}`}>
        <BarGraph3D {...{ fov, autoRotate, orthographic }} />
        <div className={css.controller}>
          <span>FOV</span>
          <input
            type="range"
            min="50"
            max="75"
            onChange={(e): void => setFov(Number(e.target.value))}
            value={fov}
          />
          <span>{fov}</span>
        </div>
        <br />
        <div className={css.controller}>
          <span>AUTO ROTATE</span>
          <input
            type="checkbox"
            onChange={(e): void => setAutoRotate(e.target.checked)}
            checked={autoRotate}
          />
        </div>
        <div className={css.controller}>
          <span>ORTOGRAPHIC</span>
          <input
            type="checkbox"
            onChange={(e): void => setOrthographic(e.target.checked)}
            checked={orthographic}
          />
        </div>
      </div>
    </>
  );
};

export default Page_13;
