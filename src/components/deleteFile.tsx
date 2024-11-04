import { FC, useState } from "react";
import css from "../styles/deleteFile.module.scss";
import { sleep } from "../utils";

const DeleteFile: FC = () => {
  const [center, setCenter] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  const [throwDocument, setThrowDocument] = useState(false);
  const [fillCheckmark, setFillCheckmark] = useState(false);
  const [killTransition, setKillTransition] = useState(false);
  const [hideOk, setHideOk] = useState(false);

  const onClick = async (): Promise<void> => {
    console.log("delete file");
    setCenter(true);
    await sleep(400);
    setShowDocument(true);
    await sleep(300);
    setThrowDocument(true);
    await sleep(1050);
    setFillCheckmark(true);
    await sleep(200);
    await sleep(1000);
    setShowDocument(false);
    setCenter(false);
    setHideOk(true);
    await sleep(500);
    setKillTransition(true);
    restoreAll();
  };

  const restoreAll = (): void => {
    setCenter(false);
    setShowDocument(false);
    setThrowDocument(false);
    setFillCheckmark(false);
    setKillTransition(false);
    setHideOk(false);
  };

  return (
    <>
      <div
        className={`
            ${center ? css.center : ""}
            ${showDocument ? css.showDocument : ""}
            ${throwDocument ? css.throwDocument : ""}
            ${fillCheckmark ? css.fillCheckmark : ""}
            ${killTransition ? css.killTransition : ""}
            ${hideOk ? css.hideOk : ""}
            ${css.deleteFile}
        `}
        onClick={onClick}
      >
        <div className={css.icon}>
          <div className={css.trashbinHandler}>
            <div className={css.document}>
              <div className={css.documentLine}></div>
              <div className={css.documentLine}></div>
              <div className={css.documentLine}></div>
              <div className={css.documentLine}></div>
            </div>
          </div>
          <div className={css.trashbinLid}></div>
          <div className={css.trashbinBody}>
            <div className={css.shreddedDocument}>
              <div className={css.paperStrip}></div>
              <div className={css.paperStrip}></div>
              <div className={css.paperStrip}></div>
              <div className={css.paperStrip}></div>
            </div>
            <div className={css.screen} />
            <div className={css.trashbinLine}></div>
            <div className={css.trashbinLine}></div>
          </div>
        </div>
        <div className={css.text}>
          <span>Delete Item</span>
        </div>
        <div className={css.okButton}>
          <div className={css.checkMark}>
            <div>
              <div />
            </div>
            <div>
              <div />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteFile;
