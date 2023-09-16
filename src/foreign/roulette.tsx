import {
    useCallback,
    useId,
    useRef,
    useState,
    MouseEvent,
    useEffect,
    useMemo,
    useLayoutEffect
  } from 'react';
  import { Coord, IExtendedPieChart, VoidFunction, IDonutChart } from './types';
  import { Box, Stack, Typography } from '@mui/material';
  import DonutGraphStyle from './styles';
  import {
    ARCTAN2,
    COSINE,
    HALF_VIEW,
    PI,
    R2D,
    SINE,
    TRIANGLE_HALF_SIDE,
    VIEW
  } from './constants';
  import { invertAngle, normalizeAngle } from './utils';
  import DonutGraphPlaceholder from './placeholder';
  
  /*
    Notes
    Data composition
    data: [
      {
        value: numeric value of the sector, it will be used to calculate the percentage
        title: title of the sector, it will be displayed on the tooltip
        color: color of the sector
        valueLabel: value to be displayed on the center of the donut depending on the selected sector
        section?:  original section data provided by the endpoint [optional]
      }
    ]
  
    When the component it's called, it should be called like this:
    <DonutGraph<Type of the original section data (optional)> { ...props} />
  
  */
  
  type ArrayPieData<CustomSection = object> = Array<IExtendedPieChart<CustomSection>>;
  
  function DonutGraph<CustomSection = object>({
    data,
    size = '100%',
    onCenterClick = null
  }: IDonutChart<CustomSection>): JSX.Element {
    const [objects, setObjects] = useState<ArrayPieData<CustomSection>>([]);
    const [center, setCenter] = useState<Coord>({ x: 0, y: 0 });
    const [angle, setAngle] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [active, setActive] = useState(false);
    const [startAngle, setStartAngle] = useState(0);
    const [finalAngle, setFinalAngle] = useState(0);
    const [lock, setLock] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [cancelClick, setCancelClick] = useState(false);
    const [current, setCurrent] =
      useState<IExtendedPieChart<CustomSection> | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  
    const rotateRef = useRef<HTMLButtonElement>(null);
    const rotateEventRef = useRef<VoidFunction | null>(null);
    const stopEventRef = useRef<VoidFunction | null>(null);
    const isMountedRef = useRef<boolean>(false);
    const id = useId();
    const maskId = `mask-${id}`;
  
    const start = useCallback((e: MouseEvent<HTMLButtonElement>) => {
      if (rotateRef.current === null) return;
      e.preventDefault();
      const clientRect = rotateRef.current.getBoundingClientRect();
      const { top, left, height, width } = clientRect;
      const newCenter = {
        x: left + width / 2,
        y: top + height / 2
      };
      const x = e.clientX - newCenter.x;
      const y = e.clientY - newCenter.y;
      const newStartAngle = R2D * ARCTAN2(y, x);
      setCenter(newCenter);
      setStartAngle(newStartAngle);
      setActive(true);
    }, []);
  
    const rotate: VoidFunction = useCallback(
      (e: globalThis.MouseEvent) => {
        e.preventDefault();
        if (!active || lock) return;
        setCancelClick(true);
        const x = e.clientX - center.x;
        const y = e.clientY - center.y;
        const deg = R2D * ARCTAN2(y, x);
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
      async (object: IExtendedPieChart<CustomSection>) => {
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
      const draws: ArrayPieData<CustomSection> = [];
      const pieData: number[] = [];
  
      const preTotal = data.reduce((acc, cur) => {
        return Number(acc) + Number(cur.value);
      }, 0);
      const minimum = preTotal * 0.01;
  
      const total: number = data.reduce((acc, cur) => {
        const currentValue = cur.value < minimum ? minimum : cur.value;
        pieData.push(currentValue);
        return acc + currentValue;
      }, 0);
  
      const sectorAngle: number[] = pieData.map((value) => {
        const angle = (value / total) * 360;
        return angle;
      });
  
      let start = 0;
      let end = 0;
  
      sectorAngle.forEach((value: number, index: number) => {
        start = end;
        end = start + value;
        // Check if the angle is over 180deg for large angle flag
        const percent = end - start;
        const overHalf = percent > 180 ? 1 : 0;
        const x1 = HALF_VIEW + 180 * COSINE((PI * start) / 180);
        const y1 = HALF_VIEW + 180 * SINE((PI * start) / 180);
        const x2 = HALF_VIEW + 180 * COSINE((PI * end) / 180);
        const y2 = HALF_VIEW + 180 * SINE((PI * end) / 180);
        const draw: string =
          sectorAngle.length === 1
            ? `M${HALF_VIEW},${HALF_VIEW} m-180,0a180,180 0 1,0 360,0a180,180 0 1,0 -360,0`
            : `M${HALF_VIEW},${HALF_VIEW} L${x1},${y1} A180,180 0 ${overHalf},1 ${x2},${y2} z`;
        draws.push({
          ...data[index],
          draw,
          drawPercent: (data[index].value / total) * 100,
          angleRange: [start, end]
        });
      });
      setObjects(draws);
    }, [data]);
  
    useEffect(() => {
      const refAngle = invertAngle(finalAngle);
      objects.forEach((value, index) => {
        if (value.angleRange[0] <= refAngle && value.angleRange[1] >= refAngle) {
          setCurrent(value);
          setCurrentIndex(index);
        }
      });
    }, [finalAngle, objects]);
  
    useEffect(() => {
      rotateEventRef.current = rotate;
      stopEventRef.current = stop;
    }, [rotate, stop]);
  
    useEffect(() => {
      isMountedRef.current = true;
      // Function to handle the "mousemove" event
      const handleMouseMove = (e: globalThis.MouseEvent): void => {
        if (isMountedRef.current && rotateEventRef.current) {
          rotateEventRef.current(e);
        }
      };
      // Function to handle the "mouseup" event
      const handleMouseUp = (e: globalThis.MouseEvent): void => {
        if (isMountedRef.current && stopEventRef.current) {
          stopEventRef.current(e);
        }
      };
      // Add event listeners to the document
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Cleanup function to remove the event listeners when the component is unmounted
      return () => {
        isMountedRef.current = false; // Remove event listeners from the document
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, []);
  
    const value: string = useMemo(() => {
      return `${current?.valueLabel ?? ''}`;
    }, [current]);
  
    const containerRef = useRef<any>(null);
    const [titleSize, setTitleSize] = useState<string>('');
    const [subtitleSize, setSubtitleSize] = useState<string>('');
  
    useLayoutEffect(() => {
      const getContainerWidth = (): void => {
        if (containerRef.current) {
          const { width } = containerRef.current.getBoundingClientRect();
          setTitleSize(`${width * 0.11}px`);
          setSubtitleSize(`${width * 0.06}px`);
        }
      };
      getContainerWidth();
      window.addEventListener('resize', getContainerWidth);
      return () => {
        window.removeEventListener('resize', getContainerWidth);
      };
    }, []);
  
    const onLoadRef = (ref: HTMLDivElement): void => {
      if (ref) {
        const { width } = ref.getBoundingClientRect();
        containerRef.current = ref;
        setTitleSize(`${width * 0.11}px`);
        setSubtitleSize(`${width * 0.06}px`);
      }
    };
  
    const onCenterClickHandler = useCallback(() => {
      if (onCenterClick && current) {
        onCenterClick(current);
      } else if (onCenterClick == null && currentIndex !== null) {
        const nextIndex =
          currentIndex === objects.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
        onSectorClick(objects[nextIndex]);
      }
    }, [onCenterClick, currentIndex, objects, current, onSectorClick]);
  
    if (objects.length === 0) return <DonutGraphPlaceholder size={size} />;
    return (
      <Stack
        ref={onLoadRef}
        sx={{ display: 'inline-block' }}
        alignItems={'center'}
        justifyContent={'center'}
        width={size}
      >
        <Box className="donut" sx={DonutGraphStyle} width={size} height={size}>
          <Box className="center" onClick={onCenterClickHandler}>
            <Typography
              sx={{ fontSize: titleSize }}
              variant="h2"
              className="title"
            >
              {value}
            </Typography>
            <Typography
              sx={{ fontSize: subtitleSize }}
              variant="h4"
              className="subtitle"
            >
              {current?.title}
            </Typography>
          </Box>
          <Box className="container" sx={{ width: size, height: size }}>
            <button
              ref={rotateRef}
              onMouseDown={(e) => {
                start(e);
              }}
              className={`
              graph
              ${animate ? 'animate' : ''}
            `}
              style={{
                transform: `rotate(${finalAngle}deg)`,
                width: size,
                height: size
              }}
            >
              <svg viewBox={`0 0 ${VIEW} ${VIEW}`}>
                <mask id={maskId}>
                  <g
                    className={`${animate ? 'animate' : ''}`}
                    transform={`rotate(${-finalAngle} ${HALF_VIEW} ${HALF_VIEW})`}
                  >
                    <rect width="100%" height="100%" fill="white" />
                    <polygon
                      points={`${VIEW - (50 + 2)},${
                        HALF_VIEW - TRIANGLE_HALF_SIDE
                      } ${VIEW - (50 + 2)},${HALF_VIEW + TRIANGLE_HALF_SIDE} ${
                        VIEW - 50 + TRIANGLE_HALF_SIDE
                      },${HALF_VIEW}`}
                      fill="black"
                    />
                    <circle
                      r={HALF_VIEW - 50}
                      cx={HALF_VIEW}
                      cy={HALF_VIEW}
                      fill="black"
                    />
                  </g>
                </mask>
                {objects.map(
                  (object: IExtendedPieChart<CustomSection>, index: number) => {
                    return (
                      <path
                        mask={`url(#${maskId})`}
                        key={index}
                        d={object.draw}
                        fill={object.color}
                        onClick={() => {
                          onSectorClick(object);
                        }}
                      />
                    );
                  }
                )}
              </svg>
            </button>
          </Box>
        </Box>
      </Stack>
    );
  }
  
  export default DonutGraph;
  