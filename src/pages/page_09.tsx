import RouletteGraph from "../components/rouletteGraph";
import css from "../styles/page.module.scss";

const Page_09 = () => {
  return (
    <>
      <div className={`${css.page}`} style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <RouletteGraph />
        <RouletteGraph relative title="Pie Chart" />
      </div>
    </>
  );
};

export default Page_09;
