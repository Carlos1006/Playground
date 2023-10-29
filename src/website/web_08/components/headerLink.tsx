import { FC } from "react";
import css from "../styles/header.module.scss";

interface LinkProps {
  text: string;
}

const Link: FC<LinkProps> = ({ text }: LinkProps) => {
  return (
    <>
      <div className={css.link}>
        <span>{text}</span>
      </div>
    </>
  );
};

export default Link;
