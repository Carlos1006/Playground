import { FC, useMemo } from "react";
import css from "../styles/main.module.scss";
import { BsFillBoxFill, BsBox2Fill } from "react-icons/bs";

interface ISubBlock_3_1 {
  color: string;
}

const SubBlock_3_1: FC<ISubBlock_3_1> = ({ color }: ISubBlock_3_1) => {
  const fluid1Gradient = useMemo(() => {
    return `radial-gradient(circle at 0.5vw 1.3vw, transparent 1vw, ${color} 1.1vw)`;
  }, [color]);

  const fluid2Gradient = useMemo(() => {
    return `radial-gradient(circle at 0.5vw -0.5vw, transparent 1vw, ${color} 1.1vw)`;
  }, [color]);

  return (
    <>
      <div
        id={css.block3_1}
        className={css.block}
        style={{ backgroundColor: color }}
      >
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
