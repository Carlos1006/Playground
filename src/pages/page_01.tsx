import DayNightToggle from "../components/daynightToggle";
import DayNightToggleVariant from "../components/daynightToggle_01";
import css from "../styles/page.module.scss";

const Page_01 = () => {
  return (
    <div className={css.component}>
      <DayNightToggle />
      <div className={css.pageDivider} />
      <DayNightToggleVariant />
    </div>
  );
};

export default Page_01;
