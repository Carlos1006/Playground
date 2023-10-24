import React, { useCallback, useEffect, useRef, useState } from "react";
import css from "../styles/main.module.scss";
import cmap from "../../../assets/maps/map1/cmap.png";
import HeightMap from "./../components/heightMap";
import { useMainContext } from "../hooks/useMainContext";
import SubBlock_1_1_Left from "./subblock_1_1_left";
import useRandomDataColor from "../hooks/useRandomDataColors";
import { MAIN_COLORS, TEN_COLORS } from "../constants";
import SubBlock_1_1_Right from "./subblock_1_1_right";

import SubBlock_1_2 from "./subblock_1_2";
import SubBlock_2_2 from "./subblock_2_2";
import SubBlock_3_1 from "./subblock_3_1";

const Main: React.FC = () => {
  const {
    canvasRef1,
    canvasRef2,
    imgContainerRef1,
    imgContainerRef2,
    imgData,
    cameraMove,
  } = useMainContext();
  const [, setDataLoaded] = useState(false);
  const colors = useRef<string[]>(MAIN_COLORS);
  const tenColors = useRef<Array<string>>(TEN_COLORS);

  const { createRandomColor, rgbToString, convertRGBToHSL, hslToString } =
    useRandomDataColor();

  const onMouseMove = (e: { clientY: number }) => {
    const { clientY } = e;
    const windowsHalfY = window.innerHeight / 2;
    const positionY = clientY - windowsHalfY;
    const percentY = positionY / windowsHalfY;
    if (cameraMove !== null) {
      cameraMove.current = percentY;
    }
  };

  const getColors = useCallback(() => {
    for (let i = 0; i < 3; i++) {
      colors.current[i] = rgbToString(
        ...createRandomColor((r, g, b) => {
          return r > g || r > b || Math.abs(r - g) < 50;
        }),
        0.8
      );
    }
    const hsl: Array<[number, number, number]> = [];
    for (let i = 0; i < 20; i++) {
      hsl.push(convertRGBToHSL(...createRandomColor()));
    }
    hsl.sort((a, b) => {
      return b[0] - a[0];
    });
    for (let i = 0; i < 20; i++) {
      tenColors.current[i] = hslToString(...hsl[i]);
    }
  }, [convertRGBToHSL, createRandomColor, hslToString, rgbToString]);

  useEffect(() => {
    if (!imgData) return;
    getColors();
    setDataLoaded(true);
  }, [getColors, imgData]);

  return (
    <div id={css.grid} onMouseMove={onMouseMove}>
      <div id={css.page}>
        <div id={css.body}>
          <div id={css.row1} className={css.row}>
            <div id={css.block1_1} className={css.block}>
              <SubBlock_1_1_Left />
              <SubBlock_1_1_Right tenColors={tenColors.current} />
            </div>
            <SubBlock_1_2 color={colors.current[0]} />
          </div>
          <div id={css.row2} className={css.row}>
            <div id={css.block2_1} className={css.block}></div>
            <SubBlock_2_2 color={colors.current[1]} />
          </div>
          <div id={css.row3} className={css.row}>
            <SubBlock_3_1 color={colors.current[2]} />
            <div id={css.block3_2} className={css.block}>
              <div className={css.subBlock}></div>
              <div
                className={css.subBlock}
                style={{ borderColor: colors.current[2] }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div id={css.backgroundContainer}>
        <div id={css.background}>
          <img src={cmap} />
        </div>
        <div className={css.images} style={{ display: "none" }}>
          <div className={css.imageContainer} ref={imgContainerRef1}>
            <canvas width={374} height={374} ref={canvasRef1} />
          </div>
          <div className={css.imageContainer} ref={imgContainerRef2}>
            <canvas width={374} height={374} ref={canvasRef2} />
          </div>
        </div>
        <HeightMap />
      </div>
    </div>
  );
};

export default Main;
