import css from '../styles/page.module.scss';
import Routes from '../routes/routes';
import { pad } from '../utils';

const Page_00 = () => {

  return <>
    <div className={css.page} style={{flexDirection:'column'}}>
      {Routes.map((route, index)=> {
        return <>
          <div className={css.link}>
            <a href={route.path}>Pagina {pad(index,2)}</a>
          </div>
        </>
      })}
    </div>
  </>
}


export default Page_00
