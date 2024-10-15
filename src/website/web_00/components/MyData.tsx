import { FC } from "react";
import css from "../styles/myData.module.scss";
import { BIRTH_DATE } from ".";
import { getExactAge } from "../utils";

const MyData: FC = () => {
  const age = getExactAge(BIRTH_DATE);

  return (
    <div id={css.myData}>
      <h1>My Data</h1>
      <div id={css.myDataWrapper}>
        <span>Full name</span>
        <div className={css.value}>
          <div>
            <span>Carlos Daniel Gonzalez Lopez</span>
          </div>
        </div>
        <span>Birth Date</span>
        <div className={css.value}>
          <div>
            <span>{BIRTH_DATE.format("dddd, MMMM Do YYYY")}</span>
          </div>
        </div>
        <span>Age</span>
        <div className={css.value}>
          <div>
            <span>{age} years old</span>
          </div>
        </div>
        <span>Country</span>
        <div className={css.value}>
          <div>
            <span>Mexico</span>
          </div>
        </div>
        <span>State</span>
        <div className={css.value}>
          <div>
            <span>Nuevo Leon</span>
          </div>
        </div>
        <span>City</span>
        <div className={css.value}>
          <div>
            <span>Monterrey</span>
          </div>
        </div>
        <span>Phone</span>
        <div className={css.value}>
          <div>
            <span>+52 1 8110351117</span>
          </div>
        </div>
        <span>Email</span>
        <div className={css.value}>
          <div>
            <span>cdgzz19@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyData;
