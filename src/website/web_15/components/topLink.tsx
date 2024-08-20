import { FC } from "react";
import css from "../styles/main.module.scss";
import ArrowRight from "./arrowRight";
import { TopLinkProps } from "../types";

const TopLink: FC<TopLinkProps> = ({ remove }: TopLinkProps) => {
  return (
    <div style={{ width: `calc(100% - ${remove}px)` }} className={css.topLink}>
      <div className={css.topLinkWrapper}>
        <div className={css.arrowTail} />
        <span>Learn more about the Call of Cthulhu</span>
        <div>
          <ArrowRight width={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default TopLink;
