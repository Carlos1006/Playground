// import { FC, useEffect, useRef, useState } from "react";
// import css from "./styles/heatmap.module.scss";
// import { IElement, IExtendedElement, ITile } from "./types";
// import Tile from "./components/Tile";

// const HeatMap: FC = () => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [tiles, setTiles] = useState<ITile<IElement>[]>([]);

//   const value: IElement[] = [
//     {
//       name: "Earth",
//       color: "rgb(133, 51, 234)",
//       value: 5101000000,
//     },
//   ];

//   const total = value.reduce((acc, curr) => acc + curr.value, 0);

//   useEffect(() => {
//     console.clear();
//     if (!ref.current) return;
//     const { width, height } = ref.current.getBoundingClientRect();
//     const area = width * height;
//     const tilesArray: ITile[] = [];
//     const cqi = width / 100;
//     const cqb = height / 100;

//     let left = 0;
//     let top = 0;
//     let leftPercentage = 100;
//     let leftWidth = width;
//     let leftHeight = height;
//     let leftArea = area;

//     const extendedValue: IExtendedElement[] = value.map((item) => {
//       const percentage = (item.value / total) * 100;
//       return {
//         ...item,
//         percentage,
//       };
//     });

//     const sorted = extendedValue.sort((a, b) => b.percentage - a.percentage);

//     console.log("begin", {
//       width,
//       height,
//       area,
//       leftWidth,
//       leftHeight,
//       top,
//       left,
//       total,
//       extendedValue,
//     });

//     let horizontal = true;

//     sorted.forEach((item, index) => {
//       const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//       console.log(`%citeration ${index + 1}`, `color: ${color}`);
//       console.log("item", item);
//       const { percentage } = item;

//       if (horizontal) {
//         // console.log("width", newWidth, "height", newHeight);
//         console.log("left", left, "top", top);
//         console.log("leftWidth", leftWidth, "leftHeight", leftHeight);
//         console.log("leftPercentage", leftPercentage);
//         console.log("leftArea", leftArea);
//         console.log("area", area);

//         const expectedArea = (area / 100) * percentage;
//         const newHeight = leftHeight;
//         const newWidth = expectedArea / newHeight;

//         console.log("expectedArea", expectedArea);

//         const leftCqi = left / cqi;
//         const topCqb = top / cqb;
//         const widthCqi = newWidth / cqi;
//         const heightCqb = newHeight / cqb;

//         tilesArray.push({
//           left: `${leftCqi}cqi`,
//           top: `${topCqb}cqb`,
//           width: `${widthCqi}cqi`,
//           height: `${heightCqb}cqb`,
//           backgroundColor: color,
//         });

//         left += newWidth;
//         leftWidth -= newWidth;
//         leftPercentage -= percentage;
//         leftArea = leftWidth * leftHeight;
//       }
//       if (!horizontal) {
//         console.log("left", left, "top", top);
//         console.log("leftWidth", leftWidth, "leftHeight", leftHeight);
//         console.log("leftPercentage", leftPercentage);
//         console.log("leftArea", leftArea);
//         console.log("area", area);

//         const expectedArea = (area / 100) * percentage;
//         const newWidth = leftWidth;
//         const newHeight = expectedArea / newWidth;

//         const leftCqi = left / cqi;
//         const topCqb = top / cqb;
//         const widthCqi = newWidth / cqi;
//         const heightCqb = newHeight / cqb;
//         console.log("expectedArea", expectedArea);

//         tilesArray.push({
//           left: `${leftCqi}cqi`,
//           top: `${topCqb}cqb`,
//           width: `${widthCqi}cqi`,
//           height: `${heightCqb}cqb`,
//           backgroundColor: color,
//         });

//         top += newHeight;
//         leftHeight -= newHeight;
//         leftPercentage -= percentage;
//         leftArea = leftWidth * leftHeight;
//       }

//       console.log(
//         `------------------------------------------------------------------`
//       );
//       horizontal = !horizontal;
//     });

//     setTiles(tilesArray);

//     return () => {
//       setTiles([]);
//     };
//   }, []);

//   return (
//     <div id={css.main} ref={ref}>
//       <div className={css.container}>
//         {tiles.map((tile, index) => (
//           <Tile key={index} {...tile} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeatMap;
export {};
