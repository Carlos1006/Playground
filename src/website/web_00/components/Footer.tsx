import { FC, useEffect, useState } from "react";
import globalCss from "../styles/main.module.scss";
import useHomeContext from "../hooks/useHomeContext";
import css from "../styles/footer.module.scss";
import img from "../../../assets/logotype/CD.png";
import { MODE } from "../constants";
import InstagramIcon from "../icons/Instagram";
import { LinkedinIcon } from "../icons/Linkedin";
import EmailIcon from "../icons/Email";
import WhatsappIcon from "../icons/Whatsapp";
import { GithubIcon } from "../icons";
import DailyDevIcon from "../icons/DailyDev";
import userImg from "../assets/user.png";
import briefcaseImg from "../assets/briefcase.png";

const Footer: FC = () => {
  const { themeMode } = useHomeContext();

  const [time, setTime] = useState(new Date());

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

  return (
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
            <span>Carlos Daniel Gonzalez Lopez</span>
          </div>
          <div id={css.role}>
            <img src={briefcaseImg} alt="CD" />
            <span>Software Engineer</span>
          </div>
          <div className={css.divider} />
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
  );
};

export default Footer;
