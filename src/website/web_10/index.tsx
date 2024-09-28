import { FC, useEffect, useMemo, useState } from "react";
import Loader from "./components/loader";
import css from "./styles/welcome.module.scss";

const Web_10: FC = () => {
  const [showingLoader, setShowingLoader] = useState(true);
  const [molecule, setMolecule] = useState(1);

  const [hexagon1, setHexagon1] = useState(1);
  const [hexagon2, setHexagon2] = useState(1);
  const [hexagon3, setHexagon3] = useState(1);

  const [product1, setProduct1] = useState(1);
  const [product2, setProduct2] = useState(1);
  const [product3, setProduct3] = useState(1);
  const [product4, setProduct4] = useState(1);

  const [networks, setNetworks] = useState(1);
  const [bigLogo, setBigLogo] = useState(1);
  const [dots, setDots] = useState(1);
  const [reducto, setReducto] = useState(1);
  const [name, setName] = useState(1);
  const [line, setLine] = useState(1);
  const [text, setText] = useState(1);
  const [more, setMore] = useState(1);

  const onLoad = (): void => {
    setTimeout(() => {
      setShowingLoader(false);
      setTimeout(() => {
        setBigLogo(0);
        setTimeout(() => {
          setHexagon1(0);
          setTimeout(() => setHexagon2(0), 150);
          setTimeout(() => setHexagon3(0), 300);
        }, 150);
        setMolecule(0);
        setTimeout(() => setNetworks(0), 50);
        setTimeout(() => setDots(0), 100);
        setTimeout(() => setReducto(0), 150);
        setTimeout(() => setName(0), 200);
        setTimeout(() => setLine(0), 250);
        setTimeout(() => setText(0), 300);
        setTimeout(() => setMore(0), 350);
        setTimeout(() => {
          setProduct1(0);
          setTimeout(() => setProduct2(0), 50);
          setTimeout(() => setProduct3(0), 100);
          setTimeout(() => setProduct4(0), 150);
        }, 350);
      }, 200);
    }, 2000);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const hexagons = useMemo(
    () => [hexagon1, hexagon2, hexagon3],
    [hexagon1, hexagon2, hexagon3]
  );

  const products = useMemo(
    () => [product1, product2, product3, product4],
    [product1, product2, product3, product4]
  );

  return (
    <>
      <div id={css.main}>
        <Loader show={showingLoader}></Loader>
        <div id={css.background}>
          <div id={css.left}>
            <div className={css.screen}></div>
            <div id={css.thc} data-hidden={molecule}></div>
            <div id={css.appName}>
              <div id={css.dots}>
                {new Array(4).fill(0).map((_, i) => (
                  <div
                    className={css.dot}
                    data-hidden={dots}
                    data-index={i}
                  ></div>
                ))}
              </div>
              <div id={css.reducto} data-hidden={reducto}>
                <span>Reducto 2022</span>
              </div>
              <div id={css.octokush} data-hidden={name}>
                <span>OctoKush</span>
              </div>
              <div className={css.line} data-hidden={line}></div>
              <div id={css.text} data-hidden={text}>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </span>
              </div>
              <div id={css.go} data-hidden={more}>
                <span>Aprender mas</span>
              </div>
            </div>
          </div>
          <div id={css.right}>
            <div className={css.screen}></div>
            <div id={css.smoke}></div>
            <div id={css.hugeLogo}></div>
            {new Array(3).fill(0).map((_, i) => (
              <div
                className={css.hexagon}
                data-hidden={hexagons[i]}
                data-index={i}
              >
                {i === 2 && (
                  <div>
                    <label>Lorem</label>
                    <span>dolor sit amet adipi scing elit Pellen.</span>
                    <div id={css.down}></div>
                  </div>
                )}
              </div>
            ))}
            <div id={css.commonProducts}>
              <div className={css.product} data-hidden={products[0]}>
                <div className={css.productImage}></div>
                <span>Puffco Peak pro</span>
                <p>dolor sit amet adipi</p>
              </div>
              <div
                className={`${css.product} ${css.select}`}
                data-hidden={products[1]}
              >
                <div className={css.productImage}></div>
                <span>Blue dream</span>
                <p>dolor sit amet adipi</p>
              </div>
              <div className={css.product} data-hidden={products[2]}>
                <div className={css.productImage}></div>
                <span>Puffco Proxy</span>
                <p>dolor sit amet adipi</p>
              </div>
              <div className={css.product} data-hidden={products[3]}>
                <div className={css.productImage}></div>
                <span>CBD Oil</span>
                <p>dolor sit amet adipi</p>
              </div>
            </div>
          </div>
          <div id={css.bigLogo} data-hidden={bigLogo}></div>
        </div>
        <div id={css.foreground}>
          <div id={css.leftBar}>
            <div id={css.logo}></div>
            <div id={css.networks} data-hidden={networks}>
              <div className={css.network}></div>
              <div className={css.network}></div>
              <div className={css.network}></div>
            </div>
            <div id={css.tools}></div>
          </div>
          <div id={css.body}>
            <div id={css.header}>
              <button className={css.roundButton}>
                <span>Iniciar sesion</span>
              </button>
              <button className={`${css.roundButton} ${css.border}`}>
                <span>Unete</span>
              </button>
              <div id={css.menu}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Web_10;
