import Forest from "../components/forest";
import css from "../styles/page.module.scss";

const Page_12 = () => {
  return (
    <>
      <div className={`${css.page} ${css.darker} ${css.flex}`}>
        <Forest />
      </div>
    </>
  );
};

export default Page_12;
