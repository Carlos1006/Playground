import { FC } from "react";
import css from "../styles/certificates.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import Certify from "./Certifiy";
import { CERTIFICATES } from "../helpers/certificates";
import useHomeContext from "../hooks/useHomeContext";

const CertificatesOld: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div id={css.certificates} data-mode={themeMode}>
      <h1>Certificates</h1>
      <div id={css.certificatesWrapper}>
        {CERTIFICATES.map((certify, index) => (
          <Certify {...certify} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CertificatesOld;
