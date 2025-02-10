import JobMasttro from "../components/JobMasttro";
import JobOnephase from "../components/JobOnephase";
import JobBanregio from "../components/JobBanregio";
import JobUMM from "../components/JobUMM";
import JobAldea from "../components/JobAldea";
import JobMilenio from "../components/JobMilenio";

import milenioSrc from "../assets/milenio.png";
import aldeaSrc from "../assets/aldea.jpg";
import ummSrc from "../assets/umm.webp";
import banregioSrc from "../assets/banregio.png";
import onephaseSrc from "../assets/onephase.jpg";
import masttroSrc from "../assets/masttro.jpg";

import { IJobObject } from "../types";

export const JOBS: IJobObject[] = [
  {
    name: "Masttro",
    description: JobMasttro,
    src: masttroSrc,
    from: "job_masttro_since",
    to: "job_masttro_to",
  },
  {
    name: "Onephase",
    description: JobOnephase,
    src: onephaseSrc,
    from: "job_onephase_since",
    to: "job_onephase_to",
  },
  {
    name: "Banregio",
    description: JobBanregio,
    src: banregioSrc,
    from: "job_banregio_since",
    to: "job_banregio_to",
  },
  {
    name: "UMM",
    description: JobUMM,
    src: ummSrc,
    from: "job_umm_since",
    to: "job_umm_to",
  },
  {
    name: "Aldea",
    description: JobAldea,
    src: aldeaSrc,
    from: "job_aldea_since",
    to: "job_aldea_to",
  },
  {
    name: "Milenio",
    description: JobMilenio,
    src: milenioSrc,
    from: "job_milenio_since",
    to: "job_milenio_to",
  },
];
