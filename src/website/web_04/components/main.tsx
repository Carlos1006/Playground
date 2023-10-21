import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import css from "../styles/main.module.scss";
import cmap from "../../../assets/maps/map1/cmap.png";
import HeightMap from "./../components/heightMap";
import { useMainContext } from "../hooks/useMainContext";

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
  const colors = useRef<string[]>([
    "rgb(12,73,103)",
    "rgb(42,116,131)",
    "rgb(37,118,136)",
  ]);

  // 44 116 126
  // 97 173 160
  // 100 146 132

  // 57 145 146
  // 29 105 128
  // 53 138 153

  // 89 96 44
  // 113 131 125
  // 121 114 67

  // 135 186 151
  // 108 151 148
  // 92 138 135

  // 11 68 101
  // 85 167 163
  // 22 81 109

  // 160 165 123
  // 112 169 143
  // 26 101 125

  const onMouseMove = (e: { clientY: number }) => {
    const { clientY } = e;
    const windowsHalfY = window.innerHeight / 2;
    const positionY = clientY - windowsHalfY;
    const percentY = positionY / windowsHalfY;
    if (cameraMove !== null) {
      cameraMove.current = percentY;
    }
  };

  const data = useMemo(() => {
    return imgData === null ? null : imgData.data;
  }, [imgData]);

  const getRandomColor = useCallback(() => {
    if (!data) return "rgb(0,0,0)";
    const { length } = data;
    const randomIndex = Math.floor(Math.random() * (length / 4));
    const r = data[randomIndex * 4];
    const g = data[randomIndex * 4 + 1];
    const b = data[randomIndex * 4 + 2];
    if (r > g || r > b || Math.abs(r - g) < 30) return getRandomColor();
    const color = `rgb(${r},${g},${b})`;
    return color;
  }, [data]);

  useEffect(() => {
    console.log("imgData", imgData);
    if (!imgData) return;
    for (let i = 0; i < 3; i++) {
      colors.current[i] = getRandomColor();
    }
    setDataLoaded(true);
  }, [getRandomColor, imgData]);

  return (
    <div id={css.grid} onMouseMove={onMouseMove}>
      <div id={css.page}>
        <div id={css.header}>
          <div id={css.logo}></div>
          <div id={css.menu}></div>
          <div id={css.actions}></div>
        </div>
        <div id={css.body}>
          <div id={css.row1} className={css.row}>
            <div id={css.block1_1} className={css.block}></div>
            <div
              id={css.block1_2}
              className={css.block}
              style={{ backgroundColor: colors.current[0] }}
            ></div>
          </div>
          <div id={css.row2} className={css.row}>
            <div id={css.block2_1} className={css.block}></div>
            <div
              id={css.block2_2}
              className={css.block}
              style={{ backgroundColor: colors.current[1] }}
            ></div>
          </div>
          <div id={css.row3} className={css.row}>
            <div
              id={css.block3_1}
              className={css.block}
              style={{ backgroundColor: colors.current[2] }}
            ></div>
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
