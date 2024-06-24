import { FC, useEffect, useRef, useState } from "react";
import mp4 from "../assets/DeloreanHight.mp4";
import css from "../styles/main.module.scss";

export const Background: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (videoRef.current && !played) {
      const video: HTMLVideoElement = videoRef.current;
      setTimeout(() => {
        video.play();
      }, 300);
      setPlayed(true);
    }
  }, [played]);

  return (
    <div className={css.image}>
      <video className={css.imageSrc} loop muted ref={videoRef}>
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
};

export default Background;
