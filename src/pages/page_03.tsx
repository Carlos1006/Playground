import { FC } from "react";
import DeleteFile from "../components/deleteFile";
import css from "../styles/page.module.scss";

const Page_03: FC = () => {
  return (
    <div className={css.component}>
      <DeleteFile />
    </div>
  );
};

export default Page_03;
