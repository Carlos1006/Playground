import { FC, useRef, useState } from "react";
import css from "./styles/heatmap.module.scss";
import { IClickPayload, IElement } from "./types";
import Tiler from "./components/Tiler";
import HeatMapContext from "./context";
import ReturnButton from "./components/ReturnButton";

const HeatMap: FC = () => {
  const items: IElement[] = [
    {
      id: 0,
      name: "Earth",
      color: "rgb(133, 51, 234)",
      value: 5101000000,
      children: [
        {
          id: 1,
          name: "North America",
          color: "rgb(51, 234, 51)",
          value: 579024000,
          children: [
            { id: 2, name: "USA", value: 331000000 },
            {
              id: 3,
              name: "Mexico",
              value: 128932753,
              color: "rgb(34, 182, 170)",
              children: [
                { id: 4, name: "Mexico City", value: 9209944 },
                { id: 5, name: "Guadalajara", value: 5295912 },
                {
                  id: 6,
                  name: "Monterrey",
                  value: 4423689,
                  color: "rgb(157, 34, 182)",
                },
              ],
            },
            { id: 7, name: "Canada", value: 37742154 },
          ],
        },
        {
          id: 8,
          name: "South America",
          color: "rgb(51, 234, 194)",
          value: 422535000,
          children: [
            { id: 9, name: "Brazil", value: 212559417 },
            { id: 10, name: "Argentina", value: 45195777 },
            { id: 11, name: "Colombia", value: 50882891 },
          ],
        },
        {
          id: 12,
          name: "Europe",
          color: "rgb(234, 103, 51)",
          value: 747636026,
          children: [
            { id: 13, name: "Germany", value: 83783942 },
            { id: 14, name: "France", value: 65273511 },
            { id: 15, name: "UK", value: 67886011 },
          ],
        },
        {
          id: 16,
          name: "Asia",
          color: "rgb(51, 124, 234)",
          value: 4641054775,
          children: [
            {
              id: 17,
              name: "China",
              value: 1439323776,
              children: [
                {
                  id: 18,
                  name: "Beijing",
                  value: 21542000,
                  children: [
                    { id: 19, name: "Dongcheng", value: 1000000 },
                    { id: 20, name: "Xicheng", value: 1000000 },
                  ],
                },
                { id: 21, name: "Tianjin", value: 15620000, children: [] },
                { id: 22, name: "Chongqing", value: 30800000, children: [] },
                { id: 23, name: "Shenzhen", value: 12530000, children: [] },
                { id: 24, name: "Shanghai", value: 24183300 },
                { id: 25, name: "Guangzhou", value: 14904400 },
              ],
            },
            { id: 26, name: "Indonesia", value: 273523615 },
            { id: 27, name: "Pakistan", value: 225199937 },
            { id: 28, name: "Bangladesh", value: 166303498 },
            {
              id: 29,
              name: "Russia",
              value: 145912025,
              children: [
                { id: 30, name: "Moscow", value: 11920000 },
                { id: 31, name: "Saint Petersburg", value: 5384000 },
              ],
            },
            { id: 32, name: "India", value: 1380004385 },
            { id: 33, name: "Japan", value: 126476461 },
          ],
        },
        {
          id: 34,
          name: "Africa",
          color: "rgb(234, 51, 179)",
          value: 1340598147,
          children: [
            { id: 35, name: "Nigeria", value: 206139589 },
            { id: 36, name: "Ethiopia", value: 114114144 },
            { id: 37, name: "Egypt", value: 102334155 },
          ],
        },
        {
          id: 38,
          name: "Oceania",
          color: "rgb(234, 63, 51)",
          value: 43111704,
          children: [
            { id: 39, name: "Australia", value: 25499884 },
            { id: 40, name: "New Zealand", value: 4822233 },
            { id: 41, name: "Papua New Guinea", value: 8947024 },
          ],
        },
        {
          id: 42,
          name: "Antarctica",
          color: "rgb(26, 99, 99)",
          value: 14000000,
          children: [],
        },
      ],
    },
  ];

  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [hoverTile, setHoverTile] = useState<number>(0);
  const [tileLine, setTileLine] = useState<number[]>([0]);
  const [selectedTile, setSelectedTile] = useState<number>(0);

  const canDrawChildren = (drawing: number): boolean => {
    if (currentLevel === 0) {
      if (drawing >= 2) return false;
    }
    if (currentLevel === 1) {
      if (drawing >= 4) return false;
    }
    return true;
  };

  const canDrawGap = (drawing: number): boolean => {
    if (drawing < 2) return false;
    return true;
  };

  const timeout = useRef<number | null>(null);
  const cooldown = useRef<boolean>(false);

  const onClick = ({ id, level, parentLine }: IClickPayload): void => {
    if (cooldown.current) return;
    cooldown.current = true;
    setSelectedTile(id);
    setCurrentLevel(level);
    setTileLine(parentLine);
    clearTimeout(timeout.current as number);
    timeout.current = window.setTimeout(() => {
      cooldown.current = false;
    }, 500);
  };

  const onReturn = (): void => {
    const newTileLine = [...tileLine];
    const [, ...rest] = newTileLine;
    const newSelectedTile = rest[0];

    const newCurrentLevel = currentLevel - 1;
    if (newCurrentLevel < 0) return;
    setTileLine(rest);
    setSelectedTile(newSelectedTile);
    setCurrentLevel((prev) => prev - 1);
  };

  return (
    <div id={css.main}>
      {currentLevel > 0 && <ReturnButton onClick={onReturn} />}
      <HeatMapContext.Provider
        value={{
          tileLine,
          currentLevel,
          hoverTile,
          selectedTile,
          setTileLine,
          setSelectedTile,
          setHoverTile,
          canDrawGap,
          canDrawChildren,
          setCurrentLevel,
          onClick,
        }}
      >
        <Tiler
          level={0}
          parentLine={[]}
          color={items[0].color as string}
          data={items[0]}
          elements={items}
        />
      </HeatMapContext.Provider>
    </div>
  );
};

export default HeatMap;
