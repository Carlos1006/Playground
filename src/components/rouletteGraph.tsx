import {
  FC,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  MouseEvent,
  useMemo,
} from "react";
import css from "../styles/rouletteGraph.module.scss";

interface IValues {
  title: string;
  value: number;
  color: string;
}

interface IObject {
  color: string;
  draw: string;
  value: number;
  percent: number;
  title: string;
  angleRange: [number, number];
}

interface IRoulette {
  relative?: boolean;
  title?: string;
  values?: IValues[];
}

type VoidFunction = (e: globalThis.MouseEvent) => void;

const { sin: Sine, cos: Cosine, atan2: ArcTan2, PI } = Math;
const view = 360;
const half = view / 2;
const R2D = 180 / PI;
const triangleSide = 25;
const triangleHalf = triangleSide / 2;

function invertAngle(angle: number): number {
  return (360 - angle) % 360;
}

function normalizeAngle(angle: number): number {
  let normalizeAngle = angle % 360;
  if (normalizeAngle < 0) {
    normalizeAngle += 360;
  }
  return normalizeAngle;
}

const RouletteGraph: FC<IRoulette> = ({
  relative = false,
  title = "Roulette Graph",
  values = [],
}: IRoulette) => {
  const [objects, setObjects] = useState<IObject[]>([]);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [active, setActive] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [finalAngle, setFinalAngle] = useState(0);
  const [lock, setLock] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [cancelClick, setCancelClick] = useState(false);
  const [current, setCurrent] = useState<IObject | null>(null);

  const rotateRef = useRef<HTMLDivElement>(null);
  const rotateEventRef = useRef<VoidFunction | null>(null);
  const stopEventRef = useRef<VoidFunction | null>(null);
  const isMountedRef = useRef<boolean>(false);
  const id = useId();
  const maskId = `mask-${id}`;

  const start = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (rotateRef.current === null) return;
    e.preventDefault();
    const clientRect = rotateRef.current.getBoundingClientRect();
    const { top, left, height, width } = clientRect;
    const newCenter = {
      x: left + width / 2,
      y: top + height / 2,
    };
    const x = e.clientX - newCenter.x;
    const y = e.clientY - newCenter.y;
    const newStartAngle = R2D * ArcTan2(y, x);
    setCenter(newCenter);
    setStartAngle(newStartAngle);
    setActive(true);
  }, []);

  const rotate = useCallback(
    (e: globalThis.MouseEvent) => {
      e.preventDefault();
      if (!active || lock) return;
      setCancelClick(true);
      const x = e.clientX - center.x;
      const y = e.clientY - center.y;
      const deg = R2D * ArcTan2(y, x);
      const newRotation = deg - startAngle;
      setRotation(newRotation);
      setFinalAngle(normalizeAngle(angle + newRotation));
    },
    [active, center, lock, startAngle, angle]
  );

  const stop = useCallback(() => {
    setAngle(angle + rotation);
    setActive(false);
    setTimeout(() => {
      setCancelClick(false);
    }, 100);
  }, [angle, rotation]);

  const onSectorClick = useCallback(
    async (object: IObject) => {
      if (cancelClick) return;
      if (lock) return;
      setLock(true);
      setAnimate(true);
      const averageAngle = (object.angleRange[0] + object.angleRange[1]) / 2;
      const refAngle = invertAngle(averageAngle);
      setFinalAngle(normalizeAngle(refAngle));
      setAngle(refAngle);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAnimate(false);
      setLock(false);
    },
    [cancelClick, lock]
  );

  useEffect(() => {
    const draws: IObject[] = [];
    const pieData: number[] = [];
    const total: number = values.reduce((acc, cur) => {
      const currentValue = cur.value > 1.5 ? cur.value : 1.5;
      pieData.push(currentValue);
      return acc + currentValue;
    }, 0);
    const sectorAngle: number[] = pieData.map((value) => (value / total) * 360);
    let start = 0;
    let end = 0;
    sectorAngle.map((value: number, index: number) => {
      start = end;
      end = start + value;
      // Check if the angle is over 180deg for large angle flag
      const percent = end - start;
      const overHalf = percent > 180 ? 1 : 0;
      const x1 = half + 180 * Cosine((PI * start) / 180);
      const y1 = half + 180 * Sine((PI * start) / 180);
      const x2 = half + 180 * Cosine((PI * end) / 180);
      const y2 = half + 180 * Sine((PI * end) / 180);
      const draw = `M${half},${half} L${x1},${y1} A180,180 0 ${overHalf},1 ${x2},${y2} z`;
      draws.push({
        color: values[index].color,
        draw: draw,
        value: values[index].value,
        percent: (values[index].value / total) * 100,
        angleRange: [start, end],
        title: values[index].title,
      });
    });
    setObjects(draws);
  }, [values]);

  useEffect(() => {
    const refAngle = invertAngle(finalAngle);
    objects.forEach((value) => {
      if (value.angleRange[0] <= refAngle && value.angleRange[1] >= refAngle) {
        setCurrent(value);
      }
    });
  }, [finalAngle, objects]);

  useEffect(() => {
    rotateEventRef.current = rotate;
    stopEventRef.current = stop;
  }, [rotate, stop]);

  useEffect(() => {
    isMountedRef.current = true;
    // Función para manejar el evento "mousemove"
    const handleMouseMove = (e: globalThis.MouseEvent): void => {
      if (isMountedRef.current && rotateEventRef.current) {
        rotateEventRef.current(e);
      }
    };

    // Función para manejar el evento "mouseup"
    const handleMouseUp = (e: globalThis.MouseEvent): void => {
      if (isMountedRef.current && stopEventRef.current) {
        stopEventRef.current(e);
      }
    };

    // Agregar los event listeners al documento
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Función de limpieza para eliminar los event listeners al desmontar el componente
    return () => {
      isMountedRef.current = false; // Marcar que el componente se desmonta
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const value: string = useMemo(() => {
    if (relative) {
      return `${current?.percent.toFixed(2)}%`;
    } else {
      return `${current?.value}`;
    }
  }, [current, relative]);

  return (
    <>
      <div className={css.container}>
        <div className={css.center}>
          <span>{value}</span>
          <label>{current?.title ?? title}</label>
        </div>
        <div
          onMouseDown={start}
          className={`
            ${css.graph}
            ${animate ? css.animate : ""}
          `}
          ref={rotateRef}
          style={{
            transform: `rotate(${finalAngle}deg)`,
          }}
        >
          <svg viewBox={`0 0 ${view} ${view}`}>
            <mask id={maskId}>
              <g
                className={`${animate ? css.animate : ""}`}
                transform={`rotate(${-finalAngle} ${half} ${half})`}
              >
                <rect width="100%" height="100%" fill="white" />
                <polygon
                  points={`${view - (50 + 2)},${half - triangleHalf} ${
                    view - (50 + 2)
                  },${half + triangleHalf} ${view - 50 + triangleHalf},${half}`}
                  fill="black"
                />
                <circle r={half - 50} cx={half} cy={half} fill="black" />
              </g>
            </mask>
            <circle
              mask={`url(#${maskId})`}
              r={half - 1}
              cx={half}
              cy={half}
              fill="rgb(120,120,120)"
            />
            {objects.map((object: IObject, index: number) => {
              return (
                <path
                  mask={`url(#${maskId})`}
                  key={index}
                  d={object.draw}
                  fill={object.color}
                  onClick={(): void => {
                    onSectorClick(object);
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </>
  );
};

export default RouletteGraph;
