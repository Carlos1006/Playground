import { FC } from "react";
import css from "../styles/certificates.module.scss";
import { ICertify } from "../types";
import useHomeContext from "../hooks/useHomeContext";
import { MODE } from "../constants";
import OldMenuSlot from "./OldMenuSlot";
import certificateIcon from "../assets/certificate.png";

const Certify: FC<ICertify> = ({
  duration,
  year,
  institution,
  name,
}: ICertify) => {
  const { themeMode } = useHomeContext();

  return (
    <div className={css.certifyBody} data-mode={themeMode}>
      {themeMode === MODE.OLD && (
        <img src={certificateIcon} alt="certificate" />
      )}
      <span>{name}</span>

      {themeMode !== MODE.OLD && (
        <span>
          {year} • {duration}
        </span>
      )}
      <span>
        {institution}
        {themeMode === MODE.OLD && (
          <>
            {" "}
            • {year} • {duration}
          </>
        )}
      </span>
      {themeMode === MODE.OLD && <OldMenuSlot />}
    </div>
  );
};

export default Certify;
