import NodeTree from "../components/nodeTree";
import css from "../styles/page.module.scss";

const Page_03 = () => {
  return (
    <>
      <div className={`${css.page} ${css.flex}`}>
        <NodeTree />
      </div>
    </>
  );
};

export default Page_03;
