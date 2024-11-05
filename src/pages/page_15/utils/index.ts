import { BubbleProps } from "../../../components/bubble";

export function createBubble(x: number, y: number): BubbleProps {
  const side = getRandomIntBetween(10, 25);
  const radius = side / 2;

  console.log("%cside", "color:orange", { x, y });

  const red = getRandomIntBetween(0, 255);
  const green = getRandomIntBetween(0, 255);
  const blue = getRandomIntBetween(0, 255);

  const center: [number, number] = [
    getRandomIntBetween(0, 100),
    getRandomIntBetween(0, 100),
  ];

  const glow: [number, number, number] = [
    maintainColorRange(red * 3.68),
    maintainColorRange(green * 3.64),
    maintainColorRange(blue * 3.95),
  ];

  const innerColor: [number, number, number] = [red, green, blue];

  const outerColor: [number, number, number] = [
    maintainColorRange(red * 1.5),
    maintainColorRange(green * 1.28),
    maintainColorRange(blue * 3.2),
  ];

  return {
    side: `${side}cqi`,
    x: `${x - radius}cqi`,
    y: `calc(${y}cqb - ${radius}cqi)`,
    center,
    color: {
      glow,
      innerColor,
      outerColor,
    },
  };
}

function getRandomIntBetween(a: number, b: number): number {
  const min = Math.ceil(a);
  const max = Math.floor(b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maintainColorRange(value: number): number {
  return Math.min(255, Math.max(0, value));
}
