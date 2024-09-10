import { FC, useEffect } from "react";
import css from "../../styles/page.module.scss";
import sx from "./styles/page17.module.scss";
import $ from "jquery";
import { IPokeData, IRawPokeData } from "./types";

const Page_17: FC = () => {
  const fetchPokemon = async (name: string): Promise<IPokeData> => {
    try {
      const data = await $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${name}`,
        method: "GET",
      });
      const parseData = data as unknown as IRawPokeData;
      const response: IPokeData = {
        name: parseData.name,
        types: parseData.types.map((item) => item.type.name),
        img: parseData.sprites.front_default,
        audio: parseData.cries.latest,
      };
      return response;
    } catch {
      return {
        name: "Ditto",
        types: ["Normal"],
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
        audio:
          "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/132.ogg",
      };
    }
  };

  const createCard = ({ types, img, audio }: IPokeData): string => {
    return `
    <div class="${sx.card}">
      <span>Ditto</span>
      <div class="${sx.type}">
        ${types.map((type) => `<span>${type}</span>`).join("")}
      </div>
      <div class="${sx.img}">
        <img src="${img}" />
      </div>
      <div class="${sx.audio}">
        <audio
          controls
          src="${audio}"
        ></audio>
      </div>
    </div>`;
  };

  useEffect(() => {
    $("#buton").on("click", async (): Promise<void> => {
      const value = `${$("#input").val()}`.trim().toLowerCase();
      if (!value) {
        alert("Please type a name");
        return;
      }
      $("#input").val("");
      const data = await fetchPokemon(value);
      const card = createCard(data);
      $(`.${sx.content}`).append(card);
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
        <div className={sx.content}></div>
      </div>
    </>
  );
};

export default Page_17;
