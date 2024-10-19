import { FC } from "react";
import css from "../styles/socialMedia.module.scss";
import InstagramIcon from "../icons/Instagram";
import SocialIcon from "./SocialIcon";
import { LinkedinIcon } from "../icons/Linkedin";
import PinterestIcon from "../icons/Pinterest";
import EmailIcon from "../icons/Email";
import WhatsappIcon from "../icons/Whatsapp";
import GithubIcon from "../icons/GithubSocial";
import DailyDevIcon from "../icons/DailyDev";
import useHomeContext from "../hooks/useHomeContext";

const SocialMedia: FC = () => {
  const { themeMode } = useHomeContext();

  return (
    <div id={css.socialMedia} data-mode={themeMode}>
      <SocialIcon title="Instagram">
        <InstagramIcon />
      </SocialIcon>
      <SocialIcon title="Linkedin">
        <LinkedinIcon />
      </SocialIcon>
      <SocialIcon title="Pinterest">
        <PinterestIcon />
      </SocialIcon>
      <SocialIcon title="Email">
        <EmailIcon />
      </SocialIcon>
      <SocialIcon title="Whatsapp">
        <WhatsappIcon />
      </SocialIcon>
      <SocialIcon title="Github">
        <GithubIcon />
      </SocialIcon>
      <SocialIcon title="Daily Dev">
        <DailyDevIcon />
      </SocialIcon>
    </div>
  );
};

export default SocialMedia;
