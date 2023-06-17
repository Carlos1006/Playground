import CompleteOrder from '../components/completeOrder';
import css from '../styles/page.module.scss';

const Page_00 = () => {

  return <>
    <div className={css.page} style={{flexDirection:'column'}}>
      <div className={css.link}>
        <a href='/day_night_toggle'>Pagina 01</a>
      </div>
      <div className={css.link}>
        <a href='/page_complete_order'>Pagina 02</a>
      </div>
      <div className={css.link}>
        <a href='/delete_file'>Pagina 03</a>
      </div>
    </div>
  </>
}


export default Page_00
