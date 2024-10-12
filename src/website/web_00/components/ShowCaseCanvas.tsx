import { FC, useEffect, useRef, useState } from "react";
import css from "../styles/showCase.module.scss";
import useResizeObserver from "../hooks/useResizeObserver";

const ShowCaseCanvas: FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { width, height } = dimensions;

  useEffect(() => {
    if (ref.current) {
      const canvas = ref.current;
      const ctx = canvas.getContext("2d");
      setContext(ctx);
    }
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    if (context && width && height) {
      const size = 30;
      const rows: number = Math.ceil(width / size);
      const cols: number = Math.ceil(height / size);
      let offset = 0;

      const render = (): void => {
        context.clearRect(0, 0, width, height);
        for (let i = 0; i < rows; i++) {
          for (let j = offset; j < cols; j++) {
            context.strokeStyle = "rgb(255,255,255,0.05)";
            context.strokeRect(i * size, j * size, size, size);
          }
        }
        offset -= 0.0025;
        if (offset < -size) {
          offset = 0;
        }
        animationFrame = requestAnimationFrame(render);
      };
      render();
    }
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (context) {
        context.clearRect(0, 0, width, height);
      }
    };
  }, [context, width, height]);

  useResizeObserver({
    ref,
    onResize: () => {
      if (!ref.current) return;
      const canvas = ref.current;
      const { width, height } = canvas.getBoundingClientRect();
      setDimensions({ width, height });
    },
  });

  return <canvas id={css.canvas} ref={ref} width={width} height={height} />;
};

export default ShowCaseCanvas;
