import { FC } from "react";
import css from "../styles/main.module.scss";
import { BsArrowUpRight } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";

interface ISubBlock_1_2 {
  color: string;
}

const SubBlock_1_2: FC<ISubBlock_1_2> = ({ color }: ISubBlock_1_2) => {
  return (
    <>
      <div
        id={css.block1_2}
        className={css.block}
        style={{ backgroundColor: color }}
      >
        <div id={css.joinIcon} className={css.icon}>
          <BsArrowUpRight />
        </div>
        <span className={css.joinMessage}>JOIN COMMUNITY</span>
        <div id={css.email} className={css.icon}>
          <MdEmail />
        </div>
        <div id={css.instagram} className={css.icon}>
          <RiInstagramFill />
        </div>
        <div id={css.whatsapp} className={css.icon}>
          <RiWhatsappFill />
        </div>
      </div>
    </>
  );
};

export default SubBlock_1_2;
