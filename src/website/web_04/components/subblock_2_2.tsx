import { FC } from "react";
import css from "../styles/main.module.scss";
import { BsArrowDownRight } from "react-icons/bs";
import mii_05 from "../assets/profiles/mii_5.png";

interface ISubBlock_2_2 {
  color: string;
}

const SubBlock_2_2: FC<ISubBlock_2_2> = ({ color }: ISubBlock_2_2) => {
  return (
    <>
      <div
        id={css.block2_2}
        className={css.block}
        style={{ backgroundColor: color }}
      >
        <div className={css.frameCorner}></div>
        <div className={css.frameCorner}></div>
        <div className={css.frameCorner}></div>
        <div className={css.frameCorner}></div>
        <div id={css.subRow1} className={css.subRow}>
          <div id={css.slide} className={css.egg}>
            <span>01 / 02</span>
          </div>
          <div id={css.mii} className={css.egg}>
            <img src={mii_05} />
          </div>
          <div id={css.slideTitle}>
            <span style={{ color }}>Lorem ipsum</span>
          </div>
        </div>
        <div id={css.subRow2} className={css.subRow}>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis at
            voluptatum, quas, quos, voluptates fugit accusantium reprehenderit
            voluptatem quae doloribus dolorum. Quasi
          </span>
          <div id={css.nextSlide}>
            <BsArrowDownRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubBlock_2_2;
