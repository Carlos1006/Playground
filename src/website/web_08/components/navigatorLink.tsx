import { FC } from "react";
import css from "../styles/navigator.module.scss";

interface LinkProps {
  selected: boolean;
  text: string;
}

const Link: FC<LinkProps> = ({ selected, text }: LinkProps) => {
  return (
    <>
      <div
        data-name={text}
        className={`${css.link} ${selected && css.selected}`}
      >
        <div className={css.linkBody} />
      </div>
    </>
  );
};

export default Link;
