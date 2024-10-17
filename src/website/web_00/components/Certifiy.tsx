import { FC } from "react";
import css from "../styles/certificates.module.scss";
import { ICertify } from "../types";

const Certify: FC<ICertify> = ({
  duration,
  year,
  institution,
  name,
}: ICertify) => {
  return (
    <div className={css.certifyBody}>
      <span>{name}</span>
      <span>
        {year} • {duration}
      </span>
      <span>{institution}</span>
    </div>
  );
};

export default Certify;
