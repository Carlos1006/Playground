import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import Bubble, { BubbleProps } from "../../components/bubble";
import css from "../../styles/page.module.scss";
import { BUBBLES } from "./constants";
import { IPage15 } from "./types";
import { createBubble } from "./utils";

const Page_15: FC<IPage15> = ({ showCase = false, container = true }) => {
  const [bubbles, setBubbles] = useState<BubbleProps[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prevBubbles) => {
        if (prevBubbles.length >= BUBBLES.length) {
          clearInterval(interval);
          return prevBubbles;
        }
        return [...prevBubbles, BUBBLES[prevBubbles.length]];
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onClick = (event: MouseEvent<HTMLElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    const x = (clickX / rect.width) * 100;
    const y = (clickY / rect.height) * 100;
    setBubbles((prev) => [...prev, createBubble(x, y)]);
  };

  return (
    <div
      className={`${css.page} ${css.black} ${css.relative} ${
        showCase ? css.showCase : ""
      }
      ${container ? css.container : ""}
      `}
      aria-roledescription="button"
      onClick={onClick}
      ref={ref}
    >
      {bubbles.map((bubble, index) => (
        <Bubble key={index} {...bubble} />
      ))}
    </div>
  );
};

export default Page_15;
