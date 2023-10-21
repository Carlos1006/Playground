import React from "react";
import css from "../styles/main.module.scss";
import cmap from "../../../assets/maps/map1/cmap.png";
import { DegToRad } from "../../../website/web_03/utils";
import HeightMap from "./../components/heightMap";
import { useMainContext } from "../hooks/useMainContext";

const Main: React.FC = () => {
  const {
    euler,
    camera,
    canvasRef1,
    canvasRef2,
    imgContainerRef1,
    imgContainerRef2,
  } = useMainContext();

  const onMouseMove = (e: { clientY: number }) => {
    if (!euler?.current || !camera?.current) return;
    const { clientY } = e;

    const windowsHalfY = window.innerHeight / 2;
    const positionY = clientY - windowsHalfY;
    const percentY = positionY / windowsHalfY;

    euler.current.x = -DegToRad(30) + percentY * -DegToRad(2);
    camera.current.setRotationFromEuler(euler.current);
  };

  return (
    <div id={css.grid} onMouseMove={onMouseMove}>
      <div id={css.background}>
        <img src={cmap} />
      </div>
      <div className={css.images}>
        <div className={css.imageContainer} ref={imgContainerRef1}>
          <canvas width={374} height={374} ref={canvasRef1} />
        </div>
        <div className={css.imageContainer} ref={imgContainerRef2}>
          <canvas width={374} height={374} ref={canvasRef2} />
        </div>
      </div>
      <HeightMap />
    </div>
  );
};

export default Main;
