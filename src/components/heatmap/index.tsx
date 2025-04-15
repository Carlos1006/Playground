import { FC, useState } from "react";
import css from "./styles/heatmap.module.scss";
import { IElement } from "./types";
import Tiler from "./components/Tiler";
import HeatMapContext from "./context";

const HeatMap: FC = () => {
  const items: IElement[] = [
    {
      name: "Earth",
      color: "rgb(133, 51, 234)",
      value: 5101000000,
      children: [
        {
          name: "North America",
          color: "rgb(51, 234, 51)",
          value: 579024000,
          children: [
            { name: "USA", value: 331000000 },
            {
              name: "Mexico",
              value: 128932753,
              children: [
                { name: "Mexico City", value: 9209944 },
                { name: "Guadalajara", value: 5295912 },
                { name: "Monterrey", value: 4423689 },
              ],
            },
            { name: "Canada", value: 37742154 },
          ],
        },
        {
          name: "South America",
          color: "rgb(51, 234, 194)",
          value: 422535000,
          children: [
            { name: "Brazil", value: 212559417 },
            { name: "Argentina", value: 45195777 },
            { name: "Colombia", value: 50882891 },
          ],
        },

        {
          name: "Europe",
          color: "rgb(234, 103, 51)",
          value: 747636026,
          children: [
            { name: "Germany", value: 83783942 },
            { name: "France", value: 65273511 },
            { name: "UK", value: 67886011 },
          ],
        },
        {
          name: "Asia",
          color: "rgb(51, 124, 234)",
          value: 4641054775,
          children: [
            {
              name: "China",
              value: 1439323776,
              children: [
                {
                  name: "Beijing",
                  value: 21542000,
                  children: [
                    { name: "Dongcheng", value: 1000000 },
                    { name: "Xicheng", value: 1000000 },
                  ],
                },
                { name: "Tianjin", value: 15620000, children: [] },
                { name: "Chongqing", value: 30800000, children: [] },
                { name: "Shenzhen", value: 12530000, children: [] },
                { name: "Shanghai", value: 24183300 },
                { name: "Guangzhou", value: 14904400 },
              ],
            },
            { name: "Indonesia", value: 273523615 },
            { name: "Pakistan", value: 225199937 },
            { name: "Bangladesh", value: 166303498 },
            {
              name: "Russia",
              value: 145912025,
              children: [
                { name: "Moscow", value: 11920000 },
                { name: "Saint Petersburg", value: 5384000 },
              ],
            },
            { name: "India", value: 1380004385 },
            { name: "Japan", value: 126476461 },
          ],
        },
        {
          name: "Africa",
          color: "rgb(234, 51, 179)",
          value: 1340598147,
          children: [
            { name: "Nigeria", value: 206139589 },
            { name: "Ethiopia", value: 114114144 },
            { name: "Egypt", value: 102334155 },
          ],
        },
        {
          name: "Oceania",
          color: "rgb(234, 63, 51)",
          value: 43111704,
          children: [
            { name: "Australia", value: 25499884 },
            { name: "New Zealand", value: 4822233 },
            { name: "Papua New Guinea", value: 8947024 },
          ],
        },
        {
          name: "Antarctica",
          color: "rgb(26, 99, 99)",
          value: 14000000,
          children: [],
        },
      ],
    },
  ];

  const [currentLevel, setCurrentLevel] = useState<number>(0);

  const canDrawChildren = (drawing: number): boolean => {
    if (drawing >= 2) return false;
    return true;
  };

  const candDrawGap = (drawing: number): boolean => {
    if (drawing < 2) return false;
    return true;
  };

  return (
    <div id={css.main}>
      <HeatMapContext.Provider
        value={{ currentLevel, candDrawGap, canDrawChildren }}
      >
        <Tiler
          color={items[0].color as string}
          data={items[0]}
          elements={items}
        />
      </HeatMapContext.Provider>
    </div>
  );
};

export default HeatMap;
