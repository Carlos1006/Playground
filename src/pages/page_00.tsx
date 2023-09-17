import css from '../styles/page.module.scss';
import Routes from '../routes/routes';

const Page_00 = () => {

  return <>
    <div className={css.page} style={{flexDirection:'column'}}>
      {Routes.map((route, index)=> {
        const name = route.path.slice(1).replace(/_/g, ' ').toUpperCase();
        return <>
          <div className={css.link}>
            <a href={route.path}>{name === '' ? 'ROOT' : name}</a>
          </div>
        </>
      })}
    </div>
  </>
}


export default Page_00
