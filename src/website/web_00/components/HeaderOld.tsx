import { FC, useState } from "react";
import css from "../styles/header.module.scss";
import Menu from "./Menu";
import usePosition from "../hooks/usePosition";

import monitorMoonImage from "../assets/monitorMoon.png";
import monitorSunImage from "../assets/monitorSun.png";
import useHomeContext from "../hooks/useHomeContext";
import { MODE } from "../constants";
import InstagramIcon from "../icons/Instagram";
import { LinkedinIcon } from "../icons/Linkedin";
import EmailIcon from "../icons/Email";
import WhatsappIcon from "../icons/Whatsapp";
import { GithubIcon } from "../icons";
import DailyDevIcon from "../icons/DailyDev";

const HeaderOld: FC = () => {
  const { setThemeMode } = useHomeContext();
  const [openSocial, setOpenSocial] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  const { ref: colorRef, position: colorPosition } =
    usePosition<HTMLDivElement>();
  const { ref: socialRef, position: socialPosition } =
    usePosition<HTMLDivElement>();

  const onSocialClick = (): void => {
    setOpenSocial((prev) => !prev);
    setOpenColor(false);
  };

  const onColorClick = (): void => {
    setOpenColor((prev) => !prev);
    setOpenSocial(false);
  };

  const backToLight = (): void => {
    setOpenColor(false);
    setThemeMode(MODE.LIGHT);
  };

  const backToDark = (): void => {
    setOpenColor(false);
    setThemeMode(MODE.DARK);
  };

  return (
    <>
      <div id={css.headerOld}>
        <div id={css.divider} />
        <div className={css.item} ref={colorRef} onClick={onColorClick}>
          <span>Color Theme</span>
        </div>
        <div className={css.item} ref={socialRef} onClick={onSocialClick}>
          <span>Social</span>
        </div>
      </div>
      <Menu
        {...colorPosition}
        open={openColor}
        items={[
          {
            title: "Back to Light Mode",
            src: monitorSunImage,
            className: css.lightMode,
            onClick: backToLight,
          },
          {
            title: "Back to Dark Mode",
            src: monitorMoonImage,
            className: css.darkMode,
            onClick: backToDark,
          },
        ]}
      />
      <Menu
        {...socialPosition}
        open={openSocial}
        items={[
          {
            title: "Instagram",
            element: (
              <div className={css.headerIcon} id={css.instagramIcon}>
                <InstagramIcon />
              </div>
            ),
            onClick: (): void => {
              setOpenSocial(false);
            },
          },
          {
            title: "Linkedin",
            element: (
              <div className={css.headerIcon} id={css.linkedinIcon}>
                <LinkedinIcon />
              </div>
            ),
            onClick: (): void => {
              setOpenSocial(false);
            },
          },
          {
            title: "Email",
            element: (
              <div className={css.headerIcon} id={css.emailIcon}>
                <EmailIcon />
              </div>
            ),
            onClick: (): void => {
              setOpenSocial(false);
            },
          },
          {
            title: "Whatsapp",
            element: (
              <div className={css.headerIcon} id={css.whatsappIcon}>
                <WhatsappIcon />
              </div>
            ),
            onClick: (): void => {
              setOpenSocial(false);
            },
          },
          {
            title: "Github",
            element: (
              <div className={css.headerIcon} id={css.githubIcon}>
                <GithubIcon />
              </div>
            ),
            onClick: (): void => {
              setOpenSocial(false);
            },
          },
          {
            title: "Daily Dev",
            element: (
              <div className={css.headerIcon} id={css.dailyDevIcon}>
                <DailyDevIcon />
              </div>
            ),
            onClick: (): void => {
              setOpenSocial(false);
            },
          },
        ]}
      />
    </>
  );
};

export default HeaderOld;