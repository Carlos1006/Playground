import { FC, useCallback, useEffect, useRef, useState } from "react";
import css from "./styles/main.module.scss";
import octopusImage from "./assets/772154_an_octopus_made_of_glass_floating_in_cyan_and_purp_xl-1024-v1-0.png";
import { createPixelMatrix } from "./utils";
import Mask from "./model/Mask";
import DragIcon from "./icons/DragIcon";

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
  const [pixelRadius, setPixelRadius] = useState(5);
  const pixelSize = pixelRadius * 2 + 1;
  const [imgSrc, setImgSrc] = useState(IMG);
  const [dragEnter, setDragEnter] = useState(false);

  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imgSrc;
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
        // ctx.fillStyle = "red";
        // ctx.fillRect(x, y, 5, 5);
      }
    }
    mask.draw(ctx);
  }, [pixelSize, imgSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      draw();
    }
    return () => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    };
  }, [draw]);

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

  const onPixelRadiusChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPixelRadius(parseInt(e.target.value));
  };

  const clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;

  const onImageDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragEnter(false);
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (e): void => {
      const result = e.target?.result;
      if (typeof result === "string") {
        setImgSrc(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div id={css.pixelate}>
      <div className={css.input}>
        <label>Pixelate: {pixelSize}px</label>
        <input
          type="range"
          min="5"
          max="30"
          step={1}
          value={pixelRadius}
          onChange={onPixelRadiusChange}
        />
      </div>
      <div
        id={css.container}
        className={`${fullHeight ? css.fullHeight : ""}`}
        onDrop={onImageDrop}
        onDragOver={(e): void => {
          e.preventDefault();
        }}
        onDragEnter={(): void => setDragEnter(true)}
      >
        {dragEnter && (
          <div
            id={css.dragEnter}
            onDragLeave={(): void => setDragEnter(false)}
            style={{
              height: `${draggerHeight}px`,
              width: `${draggerWidth}px`,
            }}
          >
            Drop Image
          </div>
        )}
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
        <img src={imgSrc} alt="Octopus" ref={imgRef} />
        <canvas id={css.canvas} ref={canvasRef} style={{ clipPath }} />
        <div id={css.shadow} />
      </div>
    </div>
  );
};

export default Pixelate;
