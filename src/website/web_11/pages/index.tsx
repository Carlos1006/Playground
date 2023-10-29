import Header from '@/components/Header';
import Visor from '@/components/Visor';
import css from '@/styles/Home.module.scss'

const _ = ()=> {
  return <>
    <div id={css.main}>
      <Header/>
      <div id={css.decorator}/>
      <Visor/>
    </div>
  </>
} 

export default _;