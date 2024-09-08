import { FC, useEffect } from "react";
import css from "../styles/page.module.scss";
import $ from "jquery";
// jQuery 4 Testing

const Page_17: FC = () => {
  useEffect(() => {
    $("#buton").on("click", (): void => {
      alert("jQuery works");
    });
    return () => {
      $("#buton").off("click");
    };
  }, []);

  return (
    <>
      <div className={`${css.page} ${css.black} ${css.relative}`}>
        <button
          id="buton"
          style={{
            margin: "10vw",
            padding: "1vh",
            borderRadius: "2vh",
            cursor: "pointer",
            border: 0,
            color: "white",
            backgroundImage:
              "linear-gradient(90deg, rgb(10,10,10), rgb(60,60,60))",
          }}
        >
          Example
        </button>
      </div>
    </>
  );
};

export default Page_17;
