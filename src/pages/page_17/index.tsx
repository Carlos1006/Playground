import { FC, useEffect } from "react";
import css from "../../styles/page.module.scss";
import sx from "./styles/page17.module.scss";
import $ from "jquery";

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
      <div
        id="main"
        className={`${css.page} ${css.black} ${css.relative} ${sx.grid}`}
      >
        <div className={sx.header}>
          <input id="input" className={sx.input} placeholder="Type a name..." />
          <button id="buton" className={sx.button}>
            find pokemon
          </button>
        </div>
        <div className={sx.content}>
          <div className={sx.card}>
            <span>Ditto</span>
            <div>
              <span>Normal</span>
            </div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" />
            <div>
              audio
              <audio
                controls
                src="https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/132.ogg"
              ></audio>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page_17;
