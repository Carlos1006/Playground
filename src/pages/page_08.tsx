import {
  FC,
  MouseEvent,
  useCallback,
  useRef,
  useState,
  WheelEvent,
} from "react";
import NodeTree from "../components/nodeTree_01";
import css from "../styles/page.module.scss";

const Page_08: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastClientX, setLastClientX] = useState(0);
  const [lastClientY, setLastClientY] = useState(0);
  const [scale, setScale] = useState(1);
  const nodeTreeRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [scalewidth, setScalewidth] = useState<number>(0);
  const [scaleheight, setScaleheight] = useState<number>(0);

  const handleMouseDown = (e: MouseEvent): void => {
    setIsScrolling(true);
    setLastClientX(e.clientX);
    setLastClientY(e.clientY);
    e.preventDefault();
  };

  const handleMouseUp = (): void => {
    setIsScrolling(false);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isScrolling || containerRef.current === null) return;
    const deltaX = lastClientX - e.clientX; // Invertimos el desplazamiento en el eje X
    const deltaY = lastClientY - e.clientY; // Invertimos el desplazamiento en el eje Y
    setLastClientX(e.clientX);
    setLastClientY(e.clientY);
    containerRef.current.scrollLeft += deltaX;
    containerRef.current.scrollTop += deltaY;
  };

  const handleZoom = (e: WheelEvent<HTMLDivElement>): void => {
    return;
    e.preventDefault();
    const scaleStep = 0.1;
    if (e.deltaY < 0) {
      setScale((prevScale) => prevScale + scaleStep);
    } else {
      setScale((prevScale) => prevScale - scaleStep);
    }
    setScale((prevScale) => Math.min(Math.max(0.5, prevScale), 2));
    calculateOffset();
  };

  const calculateOffset = useCallback(() => {
    if (nodeTreeRef.current === null) return;
    const newWidth = nodeTreeRef.current.scrollWidth;
    const newHeight = nodeTreeRef.current.scrollHeight;
    setWidth(newWidth);
    setHeight(newHeight);
    setScalewidth(newWidth * scale);
    setScaleheight(newHeight * scale);
  }, [nodeTreeRef, scale]);

  const onClick = useCallback(() => {
    if (nodeTreeRef.current === null) return;
    setTimeout(() => {
      calculateOffset();
    }, 500);
  }, [nodeTreeRef, calculateOffset]);

  return (
    <>
      <div
        className={`${css.page} ${css.inBlock}`}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleZoom}
        onClick={onClick}
      >
        <NodeTree
          link={nodeTreeRef}
          style={{
            transform: `scale(${scale})`, //  translate(-5vw, -5vw)
            top: `${(scaleheight - height) / 2}px`,
            left: `${(scalewidth - width) / 2}px`,
          }}
        />
      </div>
    </>
  );
};

export default Page_08;
