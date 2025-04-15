import { FC, useEffect, useRef, useState } from "react";
import { IExtendedElement, ITile, ITiler } from "../types";
import css from "../styles/heatmap.module.scss";
import Tile from "./Tile";
import { darker } from "../utils";

const Tiler: FC<ITiler> = ({
  elements,
  data,
  color: parentColor,
  level = 0,
}: ITiler) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tiles, setTiles] = useState<ITile[]>([]);
  const total = elements.reduce((acc, curr) => acc + curr.value, 0);

  useEffect(() => {
    // console.clear();
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    const area = width * height;
    const tilesArray: ITile[] = [];
    const cqi = width / 100;
    const cqb = height / 100;

    let left = 0;
    let top = 0;
    let leftWidth = width;
    let leftHeight = height;
    // let leftPercentage = 100;
    // let leftArea = area;

    const extendedValue: IExtendedElement[] = elements.map((item) => {
      const percentage = (item.value / total) * 100;
      return {
        ...item,
        percentage,
      };
    });

    const sorted = extendedValue.sort((a, b) => b.percentage - a.percentage);

    // console.log("begin", {
    //   width,
    //   height,
    //   area,
    //   leftWidth,
    //   leftHeight,
    //   top,
    //   left,
    //   total,
    //   extendedValue,
    // });

    const aspectRatio = width / height;

    elements.length > 0 && console.log("aspectRatio", data, aspectRatio);
    const aspectRatioThreshold = 0.6; // Adjust this threshold as needed

    let horizontal = width > height;
    const fixedOrientation = aspectRatio <= aspectRatioThreshold;

    sorted.forEach((item) => {
      const { percentage, ...originalItem } = item;
      const { color, children } = originalItem;
      // console.log(`%citeration ${index + 1}`, `color: ${color}`);
      // console.log("item", item);

      if (horizontal) {
        // console.log("width", newWidth, "height", newHeight);
        // console.log("left", left, "top", top);
        // console.log("leftWidth", leftWidth, "leftHeight", leftHeight);
        // console.log("leftPercentage", leftPercentage);
        // console.log("leftArea", leftArea);
        // console.log("area", area);

        const expectedArea = (area / 100) * percentage;
        const newHeight = leftHeight;
        const newWidth = expectedArea / newHeight;

        // console.log("expectedArea", expectedArea);

        const leftCqi = left / cqi;
        const topCqb = top / cqb;
        const widthCqi = newWidth / cqi;
        const heightCqb = newHeight / cqb;

        tilesArray.push({
          left: `${leftCqi}cqi`,
          top: `${topCqb}cqb`,
          width: `${widthCqi}cqi`,
          height: `${heightCqb}cqb`,
          backgroundColor: color ?? darker(parentColor, 50),
          backgroundColorHover: color
            ? darker(color, 20)
            : darker(parentColor, 100),
          level,
          data: originalItem,
          children,
        });

        left += newWidth;
        leftWidth -= newWidth;
        // leftPercentage -= percentage;
        // leftArea = leftWidth * leftHeight;
      }
      if (!horizontal) {
        // console.log("left", left, "top", top);
        // console.log("leftWidth", leftWidth, "leftHeight", leftHeight);
        // console.log("leftPercentage", leftPercentage);
        // console.log("leftArea", leftArea);
        // console.log("area", area);

        const expectedArea = (area / 100) * percentage;
        const newWidth = leftWidth;
        const newHeight = expectedArea / newWidth;

        const leftCqi = left / cqi;
        const topCqb = top / cqb;
        const widthCqi = newWidth / cqi;
        const heightCqb = newHeight / cqb;
        // console.log("expectedArea", expectedArea);

        tilesArray.push({
          left: `${leftCqi}cqi`,
          top: `${topCqb}cqb`,
          width: `${widthCqi}cqi`,
          height: `${heightCqb}cqb`,
          backgroundColor: color ?? darker(parentColor, 50),
          backgroundColorHover: color
            ? darker(color, 20)
            : darker(parentColor, 100),
          data: originalItem,
          level,
          children,
        });

        top += newHeight;
        leftHeight -= newHeight;
        // leftPercentage -= percentage;
        // leftArea = leftWidth * leftHeight;
      }

      // console.log(
      //   `------------------------------------------------------------------`
      // );
      if (!fixedOrientation) {
        horizontal = !horizontal;
      }
    });

    setTiles(tilesArray);

    return () => {
      setTiles([]);
    };
  }, [data, elements, level, parentColor, total]);

  return (
    <div className={css.tiler} ref={ref}>
      <div className={css.container}>
        {tiles.map((tile, index) => (
          <Tile key={index} {...tile} level={level} />
        ))}
      </div>
    </div>
  );
};

export default Tiler;
