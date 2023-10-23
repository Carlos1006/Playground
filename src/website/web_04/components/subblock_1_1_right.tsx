import { FC } from "react";
import css from "../styles/main.module.scss";

interface ISubBlock_1_1_Right {
  tenColors: string[];
}

const SubBlock_1_1_Right: FC<ISubBlock_1_1_Right> = ({
  tenColors,
}: ISubBlock_1_1_Right) => {
  return (
    <>
      <div className={css.subBlock}>
        {tenColors.map((color, index) => {
          return (
            <div
              className={css.line}
              key={index}
              style={{ backgroundColor: color }}
            ></div>
          );
        })}
      </div>
    </>
  );
};

export default SubBlock_1_1_Right;
