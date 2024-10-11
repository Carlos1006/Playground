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
    from: "Mar 2023",
    to: "Present",
  },
  {
    name: "Onephase",
    description: JobOnephase,
    src: onephaseSrc,
    from: "Mar 2023",
    to: "May 2024",
  },
  {
    name: "Banregio",
    description: JobBanregio,
    src: banregioSrc,
    from: "Oct 2021",
    to: "Mar 2023",
  },
  {
    name: "UMM",
    description: JobUMM,
    src: ummSrc,
    from: "May 2017",
    to: "Oct 2021",
  },
  {
    name: "Aldea",
    description: JobAldea,
    src: aldeaSrc,
    from: "Sep 2014",
    to: "May 2017",
  },
  {
    name: "Milenio",
    description: JobMilenio,
    src: milenioSrc,
    from: "Sep 2014",
    to: "Mar 2015",
  },
];
