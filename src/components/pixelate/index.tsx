import { FC, useEffect, useRef, useState } from "react";
import css from "./styles/main.module.scss";
import octopusImage from "./assets/772154_an_octopus_made_of_glass_floating_in_cyan_and_purp_xl-1024-v1-0.png";
import animeImage from "./assets/226981_an_anime_girl_with_black_and_pink_hair_and_headpho_xl-1024-v1-0.png";
import { createPixelMatrix } from "./utils";
import Mask from "./model/Mask";
import DragIcon from "./icons/DragIcon";
const pixelRadius = 10;
const pixelSize = pixelRadius * 2 + 1;

const IMG = octopusImage;

const Pixelate: FC = () => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const draggerContainer = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [draggerHeight, setDraggerHeight] = useState(0);
  const [fullHeight, setFullHeight] = useState(false);
  const [draggerWidth, setDraggerWidth] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;

    const draw = async (): Promise<void> => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = IMG;
      await new Promise((resolve) => {
        img.onload = (): void => resolve(true);
      });
      if (!ctx) return;

      setFullHeight(img.height >= img.width);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, img.width, img.height);
      const matrix = createPixelMatrix(imgData);
      const mask = new Mask(matrix, pixelSize);
      for (let x = 0; x < img.width; x += pixelSize) {
        for (let y = 0; y < img.height; y += pixelSize) {
          mask.fill(x, y);
          ctx.fillStyle = "red";
          ctx.fillRect(x, y, 5, 5);
        }
      }
      mask.draw(ctx);
    };
    if (canvas) {
      draw();
    }
    return () => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (imgRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { height, width } = entry.contentRect;
          setDraggerHeight(height);
          setDraggerWidth(width);
        }
      });
      resizeObserver.observe(imgRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  const onMouseMove = (e: MouseEvent): void => {
    if (!isDragging) return;
    if (!draggerContainer.current) return;
    const { left, width } = draggerContainer.current.getBoundingClientRect();
    const x = e.clientX - left;
    const p = (x / width) * 100;
    setPosition(p);
  };

  const onMouseDown = (e: MouseEvent): void => {
    const id = (e.target as HTMLElement).id;
    setIsDragging(id === css.draggerIcon);
  };

  const clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;

  return (
    <div id={css.pixelate}>
      <div id={css.container} className={`${fullHeight ? css.fullHeight : ""}`}>
        <div
          id={css.draggerContainer}
          ref={draggerContainer}
          className={`${isDragging ? css.dragging : ""}`}
          style={{
            height: `${draggerHeight}px`,
            width: `${draggerWidth}px`,
          }}
          onMouseLeave={(): void => setIsDragging(false)}
          onMouseMove={(e): void => onMouseMove(e.nativeEvent)}
          onMouseDown={(e): void => onMouseDown(e.nativeEvent)}
          onMouseUp={(): void => setIsDragging(false)}
        >
          <div id={css.dragger} style={{ left: `${position}%` }}>
            <div id={css.draggerIcon}>
              <DragIcon />
            </div>
          </div>
        </div>
        <img src={IMG} alt="Octopus" ref={imgRef} />
        <canvas id={css.canvas} ref={canvasRef} style={{ clipPath }} />
        <div id={css.shadow} />
      </div>
    </div>
  );
};

export default Pixelate;
