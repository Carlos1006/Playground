// import { FC, useEffect, useState } from "react";
// import css from "./styles/heatmap.module.scss";

// interface IElement {
//   name: string;
//   value: number;
// }

// interface ITile {
//   left: string;
//   top: string;
//   width: string;
//   height: string;
//   backgroundColor: string;
// }

// const HeatMap: FC = () => {
//   const [tiles, setTiles] = useState<ITile[]>([]);

//   const value: IElement[] = [
//     { name: "A", value: 200 },
//     { name: "B", value: 100 },
//     { name: "C", value: 50 },
//     { name: "D", value: 20 },
//     { name: "E", value: 10 },
//     { name: "F", value: 5 },
//     { name: "G", value: 2 },
//     { name: "H", value: 1 },
//   ];
//   const total = value.reduce((acc, curr) => acc + curr.value, 0);

//   useEffect(() => {
//     const orderByValue = value.sort((a, b) => b.value - a.value);
//     let totalPercentage = 100;

//     const biggestElement = orderByValue.shift() as IElement;

//     const percentage = (biggestElement.value / total) * 100;

//     totalPercentage = totalPercentage - percentage;

//     let top: number = 0;
//     let left: number = 0;

//     setTiles((prev) => {
//       return [
//         ...prev,
//         {
//           left: `${left}cqi`,
//           top: `${top}cqi`,
//           width: `${percentage}cqi`,
//           height: `100cqb`,
//           backgroundColor: "rebeccapurple",
//         },
//       ];
//     });

//     left = percentage;
//     top = 0;

//     const nextValue = orderByValue.shift() as IElement;
//     const nextPercentage = (nextValue.value / total) * 100;
//     const localPercentage = (nextPercentage / totalPercentage) * 100;

//     setTiles((prev) => {
//       return [
//         ...prev,
//         {
//           left: `${percentage}cqi`,
//           top: `${0}cqi`,
//           width: `${100 - percentage}cqi`,
//           height: `${localPercentage}cqb`,
//           backgroundColor: "cyan",
//         },
//       ];
//     });

//     console.log(
//       "nextValue",
//       totalPercentage,
//       nextValue,
//       nextPercentage,
//       localPercentage
//     );

//     return () => {
//       setTiles([]);
//     };
//   }, []);

//   return (
//     <div id={css.main}>
//       {tiles.map((tile, index) => (
//         <div key={index} className={css.tile} style={tile} />
//       ))}
//     </div>
//   );
// };

// export default HeatMap;
export {};
