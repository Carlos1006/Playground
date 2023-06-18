import { useState } from "react";
import css from "../styles/deleteFile.module.scss";

const DeleteFile = () => {
    const [center, setCenter] = useState(false);

    const onClick = () => {
        console.log("delete file");
        setCenter(true);
    }

    return <>
        <div className={`
            ${center ? css.center : ""}
            ${css.deleteFile}
        `} onClick={onClick}>
            <div className={css.icon}>
                <div className={css.trashbinHandler}></div>
                <div className={css.trashbinLid}></div>
                <div className={css.trashbinBody}>
                    <div className={css.trashbinLine}></div>
                    <div className={css.trashbinLine}></div>
                </div>
            </div>
            <div className={css.text}>
                <span>Delete Item</span>
            </div>
        </div>
    </>
}

export default DeleteFile;