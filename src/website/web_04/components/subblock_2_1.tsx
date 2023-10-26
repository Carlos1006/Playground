import { FC, useState } from "react";
import css from "../styles/main.module.scss";

interface ISubBlock_2_1 {
  colors: string[];
}

const SubBlock_2_1: FC<ISubBlock_2_1> = ({ colors }: ISubBlock_2_1) => {
  const [hover, setHover] = useState<number>(0);
  return (
    <>
      <div id={css.block2_1} className={css.block}>
        <span
          style={
            hover == 1 ? { color: colors[0], filter: "brightness(1.8)" } : {}
          }
          onMouseEnter={() => setHover(1)}
          onMouseLeave={() => setHover(0)}
        >
          About
        </span>
        <span
          style={
            hover == 2 ? { color: colors[1], filter: "brightness(1.8)" } : {}
          }
          onMouseEnter={() => setHover(2)}
          onMouseLeave={() => setHover(0)}
        >
          Projects
        </span>
        <span
          style={
            hover == 3 ? { color: colors[2], filter: "brightness(1.8)" } : {}
          }
          onMouseEnter={() => setHover(3)}
          onMouseLeave={() => setHover(0)}
        >
          Contact
        </span>
        <span
          style={
            hover == 4 ? { color: colors[3], filter: "brightness(1.8)" } : {}
          }
          onMouseEnter={() => setHover(4)}
          onMouseLeave={() => setHover(0)}
        >
          Resume
        </span>
        <span
          style={
            hover == 5 ? { color: colors[4], filter: "brightness(1.8)" } : {}
          }
          onMouseEnter={() => setHover(5)}
          onMouseLeave={() => setHover(0)}
        >
          Hiring
        </span>
      </div>
    </>
  );
};

export default SubBlock_2_1;
