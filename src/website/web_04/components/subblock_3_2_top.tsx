import { FC } from "react";
import { BsFillDiamondFill } from "react-icons/bs";
import css from "../styles/main.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import mii_05 from "../assets/profiles/mii_5.png";
import mii_06 from "../assets/profiles/mii_6.png";

interface ISubBlock_3_2_Top {
  color: string;
  color2: string;
}

const SubBlock_3_2_Top: FC<ISubBlock_3_2_Top> = ({
  color,
  color2,
}: ISubBlock_3_2_Top) => {
  return (
    <>
      <div className={`${css.subBlock} ${css.subBlock_3_2}`}>
        <div className={css.dot}>
          <BsFillDiamondFill style={{ fill: color }} />
        </div>
        <span className={css.title}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </span>
        <div className={css.designers}>
          <div className={css.designer}>
            <img src={mii_05} />
          </div>
          <div className={css.designer}>
            <img src={mii_06} />
          </div>
          <div className={css.names}>
            <label>Lorem ipsum</label>
            <label>dolor sit amet</label>
          </div>
          <button className={css.more} style={{ background: color2 }}>
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </>
  );
};

export default SubBlock_3_2_Top;
