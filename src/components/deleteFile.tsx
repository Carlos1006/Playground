import { useState } from "react";
import css from "../styles/deleteFile.module.scss";

const DeleteFile = () => {

    return <>
        <div className={css.deleteFile}>
            <div className={css.icon}>

            </div>
            <div className={css.text}>
                <span>Delete Item</span>
            </div>
        </div>
    </>
}

export default DeleteFile;