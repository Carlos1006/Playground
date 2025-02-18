import { FC } from "react";
import CompleteOrder from "../components/completeOrder";
import CompleteOrderVariant from "../components/completeOrder_01";
import css from "../styles/page.module.scss";

const Page_02: FC = () => {
  return (
    <div className={css.component}>
      <CompleteOrder />
      <div className={css.pageDivider} />
      <div className={css.pageDivider} />
      <div className={css.pageDivider} />
      <CompleteOrderVariant />
    </div>
  );
};

export default Page_02;
