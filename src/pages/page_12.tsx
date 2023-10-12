import Grid from "../components/3dGrid";
import css from "../styles/page.module.scss";

const Page_12 = () => {
  return (
    <>
      <div className={`${css.page} ${css.darker} ${css.flex}`}>
        <Grid />
      </div>
    </>
  );
};

export default Page_12;
