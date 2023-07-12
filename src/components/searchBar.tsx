import { FC } from "react"
import css from "./../styles/searchBar.module.scss";

const SearchBar: FC = () => {

    return (
        <>
            <div className={css.searchBar}>
                <div className={css.caret}/>
            </div>
        </>
    )
}

export default SearchBar;