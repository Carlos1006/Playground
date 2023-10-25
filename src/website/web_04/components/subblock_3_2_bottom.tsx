import { FC, useMemo } from "react";
import { BsFillDiamondFill } from "react-icons/bs";
import css from "../styles/main.module.scss";

interface ISubBlock_3_2_Bottom {
  color: string;
  color2: string;
}

const SubBlock_3_2_Bottom: FC<ISubBlock_3_2_Bottom> = ({
  color,
  color2,
}: ISubBlock_3_2_Bottom) => {
  const background = useMemo(() => {
    return `linear-gradient(90deg, ${color} 0%, ${color2} 100%)`;
  }, [color, color2]);

  return (
    <>
      <div
        className={`${css.subBlock} ${css.subBlock_3_2}`}
        style={{ borderColor: color }}
      >
        <div className={css.dot}>
          <BsFillDiamondFill style={{ fill: color }} />
        </div>
        <span className={css.title}>
          Lorem ipsum dolor sit amet consectetur adipisicing
        </span>
        <div className={css.names}>
          <label>2020.10.06</label>
        </div>
        <button style={{ background }}>
          <span>DETAILS</span>
        </button>
      </div>
    </>
  );
};

export default SubBlock_3_2_Bottom;
