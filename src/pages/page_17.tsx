import { FC, useEffect } from "react";
import css from "../styles/page.module.scss";
import $ from "jquery";
// jQuery 4 Testing

const Page_17: FC = () => {
  useEffect(() => {
    $("#buton").on("click", (): void => {
      alert("jQuery works");

      $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/ditto",
        method: "GET",
        success: (data) => {
          console.log(data);
        },
        error: (error) => {
          alert("Error fetching Pokémon data");
        },
      });
    });
    return () => {
      $("#buton").off("click");
    };
  }, []);

  return (
    <>
      <div id="main" className={`${css.page} ${css.black} ${css.relative}`}>
        <button
          id="buton"
          style={{
            margin: "10vw",
            padding: "1vh 2vh",
            borderRadius: "2vh",
            cursor: "pointer",
            border: 0,
            color: "white",
            backgroundImage:
              "linear-gradient(90deg, rgb(10,10,10), rgb(60,60,60))",
          }}
        >
          Test Alert
        </button>
      </div>
    </>
  );
};

export default Page_17;
