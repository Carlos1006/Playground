import { FC } from "react";
import css from "../styles/main.module.scss";
import { TextProps } from "../types";

const Text: FC<TextProps> = ({ isMobile }: TextProps) => {
  return (
    <div className={css.text}>
      <span>
        The Great
        <br />
        Old One
        <br />
        Is{isMobile && <>&nbsp;</>}
        {!isMobile && <br />}
        Coming...
        {!isMobile && <br />}
        &nbsp;
      </span>
    </div>
  );
};

export default Text;
