import { FC, useEffect, useState } from "react";
import globalCss from "../styles/main.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import css from "../styles/footer.module.scss";
import img from "../../../assets/logotype/CD.png";
import { FULL_NAME, LANGUAGES, MODE } from "../constants";
import InstagramIcon from "../icons/Instagram";
import { LinkedinIcon } from "../icons/Linkedin";
import EmailIcon from "../icons/Email";
import WhatsappIcon from "../icons/Whatsapp";
import { GithubIcon } from "../icons";
import DailyDevIcon from "../icons/DailyDev";
import userImg from "../assets/user.png";
import briefcaseImg from "../assets/briefcase.png";
import usePosition from "../hooks/usePosition";

import usImage from "../assets/us.svg";
import mexicoImage from "../assets/mexico.svg";
import Menu from "./Menu";
import { useTranslation } from "react-i18next";

const Footer: FC = () => {
  const { themeMode } = useHomeContext();
  const { i18n, t } = useTranslation();
  const [openLanguage, setOpenLanguage] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());

  const { ref: colorRef, position: colorPosition } =
    usePosition<HTMLDivElement>();

  const onColorClick = (): void => {
    setOpenLanguage((prev) => !prev);
  };

  useEffect(() => {
    let interval = null;
    if (themeMode === MODE.OLD) {
      interval = setInterval(() => {
        setTime(new Date());
      }, 60000);
    }
    return () => {
      if (interval && themeMode === MODE.OLD) {
        clearInterval(interval);
      }
    };
  }, [themeMode]);

  const onEsp = (): void => {
    i18n.changeLanguage(LANGUAGES.ES);
    localStorage.setItem("language", LANGUAGES.ES);
    setOpenLanguage(false);
  };

  const onEng = (): void => {
    localStorage.setItem("language", LANGUAGES.EN);
    i18n.changeLanguage(LANGUAGES.EN);
    setOpenLanguage(false);
  };

  return (
    <>
      <div
        id={css.footer}
        data-slot="f0000-00"
        data-mode={themeMode}
        className={globalCss.slot}
      >
        {themeMode === MODE.OLD && (
          <>
            <div id={css.startButton}>
              <img src={img} alt="CD" />
            </div>
            <div className={css.divider} />
            <div id={css.socialIcons}>
              <div id={css.instagramIcon} className={css.socialIcon}>
                <InstagramIcon />
              </div>
              <div id={css.linkedinIcon} className={css.socialIcon}>
                <LinkedinIcon />
              </div>
              <div id={css.emailIcon} className={css.socialIcon}>
                <EmailIcon />
              </div>
              <div id={css.whatsappIcon} className={css.socialIcon}>
                <WhatsappIcon />
              </div>
              <div id={css.githubIcon} className={css.socialIcon}>
                <GithubIcon />
              </div>
              <div id={css.dailyDevIcon} className={css.socialIcon}>
                <DailyDevIcon />
              </div>
            </div>
            <div className={css.divider} />
            <div id={css.myName}>
              <img src={userImg} alt="CD" />
              <span>{FULL_NAME}</span>
            </div>
            <div id={css.role}>
              <img src={briefcaseImg} alt="CD" />
              <span>{t("role")}</span>
            </div>
            <div className={css.divider} />
            <div className={css.item} ref={colorRef} onClick={onColorClick}>
              <span className={css.languageButton}>{i18n.language}</span>
            </div>
            <div id={css.time}>
              <span>
                {time.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
          </>
        )}
      </div>
      <Menu
        {...colorPosition}
        open={openLanguage}
        forcedRight={10}
        forcedBottom={50}
        items={[
          {
            title: t("english"),
            src: usImage,
            className: css.flag,
            onClick: onEng,
          },
          {
            title: t("spanish"),
            src: mexicoImage,
            className: css.flag,
            onClick: onEsp,
          },
        ]}
      />
    </>
  );
};

export default Footer;
