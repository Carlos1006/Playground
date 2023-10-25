import { FC, useMemo } from "react";
import css from "../styles/main.module.scss";
import { BsFillBoxFill } from "react-icons/bs";

interface ISubBlock_3_1 {
  color: string;
  color2: string;
}

const SubBlock_3_1: FC<ISubBlock_3_1> = ({ color, color2 }: ISubBlock_3_1) => {
  const fluid1Gradient = useMemo(() => {
    return `radial-gradient(circle at 0.5vw 1.3vw, transparent 1vw, ${color} 1.1vw)`;
  }, [color]);

  const fluid2Gradient = useMemo(() => {
    return `radial-gradient(circle at 0.5vw -0.5vw, transparent 1vw, ${color} 1.1vw)`;
  }, [color]);

  const background = useMemo(() => {
    return `linear-gradient(to right, ${color2} 0%, ${color} 100%)`;
  }, [color, color2]);

  return (
    <>
      <div id={css.block3_1} className={css.block} style={{ background }}>
        <div id={css.subblock_3_1_left}>
          <div className={css.subRow}>
            <div id={css.box}>
              <BsFillBoxFill style={{ fill: color2 }} />
            </div>
            <span>PRODUCT TEST</span>
          </div>
          <div className={css.subRow}>
            <span>Reducto Projects</span>
          </div>
        </div>
        <div id={css.subblock_3_1_right}>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
        <div
          id={css.fluid1}
          style={{ background: fluid1Gradient }}
          className={css.fluid}
        ></div>
        <div
          id={css.fluid2}
          style={{ background: fluid2Gradient }}
          className={css.fluid}
        ></div>
      </div>
    </>
  );
};

export default SubBlock_3_1;
