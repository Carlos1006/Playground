import { FC, useEffect, useState } from "react";
import css from "../styles/dateToImage.module.scss";
import { sha256 } from "js-sha256";

const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

interface DateImageProps {
  day: number;
  month: number;
  year: number;
  pad?: boolean;
}

const DateImage: FC<DateImageProps> = ({
  day,
  month,
  year,
  pad = false,
}: DateImageProps) => {
  const [code, setCode] = useState<string[] | null>(null);
  const load = (): void => {
    const date = new Date();
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setMinutes(0);
    date.setHours(0);
    date.setDate(day);
    date.setMonth(month - 1);
    date.setFullYear(year);
    const time = date.getTime();
    const paddedTime = time / 100000;
    const hash = sha256(`${pad ? paddedTime : time}`);
    const hashs: string[] = [];
    for (let i = 0; i < hash.length; i += 6) {
      if (hashs.length < 9) {
        hashs.push(hash.substr(i, 6));
      }
    }
    setCode(hashs);
  };

  useEffect(load, [day, month, pad, year]);

  return (
    <div className={css.dataImage}>
      <span>
        {String(day).padStart(2, "0")} {months[month - 1]} {year}
      </span>
      <div className={css.sqrContainer}>
        <div className={css.subSqrContainer}>
          {code && (
            <>
              {code.map((element, index) => (
                <div
                  key={index}
                  className={css.sqr}
                  style={{ backgroundColor: `#${element}` }}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateImage;
