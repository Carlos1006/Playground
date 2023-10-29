import css from "../styles/header.module.scss";
import CDG1 from "../../../assets/logotype/CDG1.png";

const Header = () => {
  return (
    <div id={css.header}>
      <div id={css.headerMargin}>
        <div id={css.logotype}>
          <img src={CDG1} />
        </div>
      </div>
    </div>
  );
};

export default Header;
