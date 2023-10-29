import DateImage from "../components/dateToImg";
import css from "../styles/page.module.scss";

const Page_13 = () => {
  return (
    <>
      <div className={`${css.component} ${css.dark} ${css.grid3}`}>
        <DateImage day={6} month={10} year={2023} />
        <DateImage day={2} month={11} year={2023} />
        <DateImage day={11} month={2} year={2022} />
        <DateImage day={6} month={10} year={2022} />
        <DateImage day={6} month={10} year={1994} />
        <DateImage day={2} month={11} year={1994} />
        <DateImage day={1} month={1} year={2021} />
        <DateImage day={6} month={10} year={1995} />
        <DateImage day={25} month={12} year={0} />
        <DateImage day={1} month={9} year={1939} />
        <DateImage day={8} month={1} year={202} />
        <DateImage day={9} month={1} year={202} />
        <DateImage day={20} month={12} year={1968} />
        <DateImage day={18} month={5} year={1968} />
        <DateImage day={28} month={1} year={1993} />
        <DateImage day={7} month={12} year={1990} />
      </div>
    </>
  );
};

export default Page_13;
