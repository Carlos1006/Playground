import RouletteGraph from "../components/rouletteGraph";
import css from "../styles/page.module.scss";

const Page_09 = () => {
  
  const COLORS: string[] = ["#13263a", "#74b8fe", "#89fa3a", "#ffb806", "#fe4c76", "#FFF501"];
  const COLD_COLORS: string[] = ["#13263a", "#74b8fe", "#89fa3a", "#1c9ef5", "#2ca8c2", "#556270"];

  const values1 =[
    {title: "Azure Dreams", value: 140, color: COLD_COLORS[0]},
    {title: "Beneath the Stars", value: 12, color: COLD_COLORS[1]},
    {title: "Crimson Skies", value: 46, color: COLD_COLORS[2]},
    {title: "Dancing Raindrops", value: 89, color: COLD_COLORS[3]},
    {title: "Ethereal Echoes", value: 10, color: COLD_COLORS[4]},
    {title: "Fading Horizons", value: 60, color: COLD_COLORS[5]}
  ]

  const values2 = [
    {title: "Glimmering Twilight", value: 200, color: COLORS[0]},
    {title: "Harmony's Embrace", value: 50, color: COLORS[1]},
    {title: "Infinite Whispers", value: 12, color: COLORS[2]},
    {title: "Journey's End", value: 80, color: COLORS[3]},
    {title: "Kaleidoscope Dreams", value: 2, color: COLORS[4]},
    {title: "Luminous Reverie", value: 30, color: COLORS[5]},
  ]
  
  return (
    <>
      <div className={`${css.page}`} style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <RouletteGraph values={values1} />
        <RouletteGraph values={values2} relative title="Pie Chart" />
      </div>
    </>
  );
};

export default Page_09;
