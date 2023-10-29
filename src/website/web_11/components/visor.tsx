import css from "../styles/Visor.module.scss";

import { MdRestaurant } from "react-icons/md";

import mini_00 from "../assets/test/logo_iwa.jpg";
import mini_01 from "../assets/test/logo_nikkori.jpg";
import mini_02 from "../assets/test/logo_unagi.png";
import mini_03 from "../assets/test/logo_wok.jpg";
import mini_04 from "../assets/test/logo_yamatop.jpg";
import sushiImg from "../assets/pictures/sushi_00.png";
import { Button } from "./inputs";

const MINI_LOGOS = [mini_00, mini_01, mini_02, mini_03, mini_04];
const MAIN_IMG_SIDE = 500;
const TEXT = `Originario de Japón. Consiste en un pequeño bloque de arroz cocido con vinagre de arroz, cubierto con una fina rebanada de pescado crudo o mariscos. El nigiri sushi se dice que se originó en la ciudad de Edo (ahora conocida como Tokio) en el siglo XIX.`;

const Visor = () => {
  return (
    <>
      <div className={css.visor}>
        <div className={css.text}>
          <h2>にぎり</h2>
          <h1>Nigiri Sushi</h1>
          <span>Hecho con arroz y un trozo de filete pescado</span>
        </div>
        <div className={css.carrousel}>
          <div className={css.bigText}>
            <span>にぎり寿司</span>
          </div>
          <div className={css.image}>
            <img
              src={sushiImg}
              alt=""
              width={MAIN_IMG_SIDE}
              height={MAIN_IMG_SIDE}
            />
            <img
              src={sushiImg}
              alt=""
              width={MAIN_IMG_SIDE}
              height={MAIN_IMG_SIDE}
            />
          </div>
          <span className={css.description}>{TEXT}</span>
          <div className={css.miniLogos}>
            {MINI_LOGOS.map((logo, i) => (
              <div key={i} className={css.miniLogo}>
                <img
                  src={logo}
                  alt=""
                  width={MAIN_IMG_SIDE}
                  height={MAIN_IMG_SIDE}
                />
              </div>
            ))}
          </div>
          <Button
            title="Ordenar ahora"
            icon={<MdRestaurant className={css.buttonIcon} />}
            extra={css.button}
          />
        </div>
      </div>
    </>
  );
};

// Descripcion
// Restaurante que lo preparan
// Call to action para pedirlo

export default Visor;
