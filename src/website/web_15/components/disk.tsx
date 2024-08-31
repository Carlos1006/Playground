import { ForwardedRef, forwardRef, ReactNode } from "react";
import css from "../styles/main.module.scss";

const Disk = (_: unknown, ref: ForwardedRef<HTMLSpanElement>): ReactNode => {
  return (
    <div className={css.disk}>
      <div className={css.diskInner}></div>
      <div className={css.diskFront}>
        <span ref={ref}>
          Lorem ipsum dolor <b>sit amet</b>
          <br />
          consectetur adipiscing elit.
        </span>
      </div>
    </div>
  );
};

const DiskRef = forwardRef<HTMLSpanElement>(Disk);

export default DiskRef;
