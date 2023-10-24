import css from "../styles/main.module.scss";
import logoBW from "../assets/images/reducto_bw.png";
import { FaLinkedinIn } from "react-icons/fa";
import mii_01 from "../assets/profiles/mii_0.png";
import mii_02 from "../assets/profiles/mii_1.png";
import mii_03 from "../assets/profiles/mii_3.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const SubBlock_1_1_Left = () => {
  return (
    <div className={css.subBlock}>
      <span className={css.name}>Carlos Daniel</span>
      <div className={css.reductoRow}>
        <span className={css.reducto}>REDU</span>
      </div>
      <div className={css.reductoRow}>
        <span className={css.reducto}>CT</span>
        <div className={css.reductoLogo}>
          <img src={logoBW} />
        </div>
      </div>
      <span className={css.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
        dolorum. Lorem ipsum dolor sit amet consectetur
      </span>
      <div className={css.actions}>
        <div id={css.explore}>
          <div className={css.icon}>
            <MdKeyboardDoubleArrowRight />
          </div>
          <span>CONTACT ME</span>
        </div>
        <div id={css.linkedin}>
          <FaLinkedinIn />
        </div>
        <div id={css.customers}>
          <div>
            <img src={mii_01} />
          </div>
          <div>
            <img src={mii_02} />
          </div>
          <div>
            <img src={mii_03} />
          </div>
          <span>
            <label>1.5M</label>
            <label>Costumers</label>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubBlock_1_1_Left;
