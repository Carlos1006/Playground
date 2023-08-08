import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import css from "../styles/rouletteGraph.module.scss";

const COLORS = ["#13263a", "#74b8fe", "#89fa3a", "#ffb806", "#fe4c76", "#FFF501"];

interface IObject {
  color: string;
  d: string;
  value: number;
  percent: number;
  angleRange: [number, number];
}

const RouletteGraph = () => {
  const [values] = useState([140, 12, 46, 89, 10, 60]);
  const [objects, setObjects] = useState<IObject[]>([]);
  const view = 360;
  const half = view / 2;

  const rotateRef = useRef<HTMLDivElement>(null);
  const R2D = 180 / Math.PI;
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [active, setActive] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [finalAngle, setFinalAngle] = useState(0);
  const [lock, setLock] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [cancelClick, setCancelClick] = useState(false);

  const [current, setCurrent] = useState<IObject>({});

  const start = useCallback(
    (e) => {
      if (rotateRef.current === null) return;
      e.preventDefault();
      const bb = rotateRef.current.getBoundingClientRect();
      const t = bb.top;
      const l = bb.left;
      const h = bb.height;
      const w = bb.width;
      const newCenter = {
        x: l + w / 2,
        y: t + h / 2,
      };
      const x = e.clientX - newCenter.x;
      const y = e.clientY - newCenter.y;
      const newStartAngle = R2D * Math.atan2(y, x);
      setCenter(newCenter);
      setStartAngle(newStartAngle);
      setActive(true);
    },
    [R2D]
  );

  function convertirAngulo(angulo: number): number {
    let anguloNormalizado = angulo % 360;
    if (anguloNormalizado < 0) {
      anguloNormalizado += 360;
    }
    return anguloNormalizado;
  }

  function invertirAngulo(angulo: number): number {
    return (360 - angulo) % 360;
  }

  const rotate = useCallback(
    (e) => {
      e.preventDefault();
      if (!active || lock) return;
      setCancelClick(true);
      const x = e.clientX - center.x;
      const y = e.clientY - center.y;
      const d = R2D * Math.atan2(y, x);
      const newRotation = d - startAngle;
      setRotation(newRotation);
      setFinalAngle(convertirAngulo(angle + newRotation));
    },
    [active, center, lock, startAngle, angle, R2D, cancelClick]
  );

  const stop = useCallback(() => {
    setAngle(angle + rotation);
    setActive(false);
    setTimeout(() => {
      setCancelClick(false);
    },100);
  }, [angle, rotation]);

  useEffect(() => {
    document.addEventListener("mousemove", rotate);
    document.addEventListener("mouseup", stop);
    return () => {
      document.removeEventListener("mousemove", rotate);
      document.removeEventListener("mouseup", stop);
    };
  }, [rotate, stop]);

  useEffect(() => {
    const objects_: IObject[] = [];
    const pieData: number[] = [];
    const total: number = values.reduce((acc, cur) => {
      pieData.push(cur);
      return acc + cur;
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
      const x1 = half + 180 * Math.cos((Math.PI * start) / 180);
      const y1 = half + 180 * Math.sin((Math.PI * start) / 180);
      const x2 = half + 180 * Math.cos((Math.PI * end) / 180);
      const y2 = half + 180 * Math.sin((Math.PI * end) / 180);
      const d = `M${half},${half} L${x1},${y1} A180,180 0 ${overHalf},1 ${x2},${y2} z`;
      objects_.push({
        color: COLORS[index],
        d: d,
        value: values[index],
        percent: (values[index] / total) * 100,
        angleRange: [start, end],
      });
    });
    setObjects(objects_);
  }, []);

  useEffect(() => {
    const refAngle = invertirAngulo(finalAngle);
    objects.forEach((value) => {
      if (value.angleRange[0] <= refAngle && value.angleRange[1] >= refAngle) {
        setCurrent(value);
      }
    });

  }, [finalAngle, objects]);

  const onSectorClick = async(object: IObject) => {
    if (cancelClick) return;
    if(lock) return;
    setLock(true); 
    setAnimate(true);
    const averageAngle = (object.angleRange[0] + object.angleRange[1]) / 2;
    const refAngle = invertirAngulo(averageAngle);
    setFinalAngle(convertirAngulo(refAngle));
    setAngle(refAngle);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAnimate(false);
    setLock(false);
  }

  const triangleSide = 25;
  const triangleHalf = triangleSide / 2;

  return (
    <>
      <div className={css.container}>
        <div className={css.center}>
          <span>
            {current.value}
          </span>
          <label>Sample Title</label>
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
            <mask id="hole">
              <g className={`${animate ? css.animate : ""}`} transform={`rotate(${-finalAngle} ${half} ${half})`}>
                <rect width="100%" height="100%" fill="white" />
                <polygon points={`${view - (50 + 2)},${half - triangleHalf} ${view - (50 + 2)},${half + triangleHalf} ${view - 50 + triangleHalf},${half}`} fill="black" />
                <circle r={half - 50} cx={half} cy={half} fill="black" />
              </g>
            </mask>
            {objects.map((object: IObject, index: number) => {
              return (
                <path
                  mask="url(#hole)"
                  key={index}
                  d={object.d}
                  style={{ fill: object.color }}
                  onClick={() => { onSectorClick(object) }}
                ></path>
              );
            })}
            
          </svg>
        </div>
      </div>
    </>
  );
};

export default RouletteGraph;
