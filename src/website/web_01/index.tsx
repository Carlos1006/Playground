import { FC } from "react";
import css from "./style/main.module.scss";
import Header from "./components/header";
import Body from "./components/body";
import { BsDot } from "react-icons/bs";
import { AiOutlineMinus, AiOutlineStar } from "react-icons/ai";
import { BsPlusLg, BsFillPlayFill } from "react-icons/bs";
import { BiMenu } from 'react-icons/bi';
import { TfiArrowLeft, TfiArrowRight, TfiLayoutGrid2Alt} from 'react-icons/tfi';
import { FiSearch, FiArrowUpRight } from 'react-icons/fi';

import mii_00 from "./assets/profiles/mii_0.png";
import mii_01 from "./assets/profiles/mii_1.png";
import mii_02 from "./assets/profiles/mii_2.png";
import mii_03 from "./assets/profiles/mii_3.png";

import panoramic_01 from "./assets/panoramic/panoramic_01.png";
import panoramic_00 from "./assets/panoramic/panoramic_00.png";
import panoramic_04 from "./assets/panoramic/panoramic_04.png";

const Web_01: FC = () => {
    
    return <>
        <div className={css.container}>
            <Header />
            <Body>
                <div id={css.firstRow} className={css.row}>
                    <div id={css.icon}>
                        <TfiLayoutGrid2Alt />
                    </div>
                    <button id={css.buttonPlace} className={css.firstRowButton}>
                        <div className={css.dotIcon}>
                            <BsDot />
                        </div>
                        <span>Iceland</span>
                        <div className={css.lineIcon}>
                            <AiOutlineMinus />
                        </div>
                        <span>2023</span>
                    </button>
                    <button id={css.buttonAction} className={css.firstRowButton}>
                        <div className={css.dotIcon}>
                            <BsDot />
                        </div>
                        <span>Wonders</span>
                    </button>
                </div>
                <div id={css.secondRow} className={css.row}>
                    <div className={`${css.firstColumn} ${css.column}`}>
                        <h1 id={css.mainTitle}>Scenic Iceland</h1>
                    </div>
                    <div id={css.secondRowSecondColumn} className={`${css.secondColumn} ${css.column}`}>
                        <p id={css.mainParagraph}>
                            lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div id={css.secondRowSecondColumnActions}>
                            <button id={css.actionButton}>
                                <span>Get consultation</span>
                            </button>
                            <button id={css.playButton}>
                                <BsFillPlayFill />
                            </button>
                        </div>
                    </div>
                </div>
                <div id={css.thirdRow} className={css.row}>
                    <div className={`${css.firstColumn} ${css.column}`}>
                        <div id={css.firstSubColumn} className={`${css.subColumn}`}>
                            <h2>About tour to iceland</h2>
                            <p>
                                lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                sed do eiusmod tempor incididunt
                            </p>
                            <div id={css.users}>
                                <div className={css.user}>
                                    <img src={mii_00} alt="" />
                                </div>
                                <div className={css.user}>
                                    <img src={mii_01} alt="" />
                                </div>
                                <div className={css.user}>
                                    <img src={mii_02} alt="" />
                                </div>
                                <div className={css.user}>
                                    <img src={mii_03} alt="" />
                                </div>
                                <div id={css.divisor}/>
                                <div id={css.usersRecord}>
                                    <span>10k users have</span>
                                    <span>visited iceland</span>
                                </div>
                            </div>
                            <div id={css.titleIncludes}>
                                <span>Our tour to</span>
                                <span>Iceland includes:</span>
                            </div>
                            <div id={css.includes}>
                                <div><span>Transfer</span></div>
                                <div><span>Outfit</span></div>
                                <div><span>Food & Water</span></div>
                                <div><span>Guide</span></div>
                                <div><span>Tour</span></div>
                                <div><span>Photographer</span></div>
                            </div>
                        </div>
                        <div id={css.secondSubColumn} className={`${css.subColumn}`}>
                            <div id={css.mainBackground}>
                                <img src={panoramic_04} alt="" />
                                <div id={css.pictureTopActions}>
                                <button className={css.roundButton}><FiArrowUpRight /></button>
                                <button className={css.roundButton}><BsPlusLg /></button>
                                <button className={css.roundButton} id={css.evaluationButton}>
                                    <div id={css.miniBakcgroundPicture}>
                                        <div>
                                            <img src={panoramic_01} />
                                        </div>
                                    </div>
                                    <span>Tour evaluation</span>
                                    <AiOutlineStar />
                                    <span>(4.5)</span>
                                </button>
                            </div>
                            <div id={css.pictureBottomActionsContainer}>
                                <div id={css.pictureBottomActions}>
                                    <button className={css.selected}><BiMenu /><span>Menu</span></button>
                                    <button><span>Sort By</span></button>
                                    <button><span>Filter</span></button>
                                    <button><FiSearch /><span>Search</span></button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${css.secondColumn} ${css.column}`}>
                        <div id={css.sidePicture}>
                            <img src={panoramic_00} alt="" />
                        </div>
                        <div id={css.rightBottomText}>
                            <span>Tour</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</p>
                        </div>
                        <div id={css.navigator}>
                            <div id={css.navIndicator}>
                                <span>Iceland</span>
                                <div id={css.navLine}/>
                                <span>1/3</span>
                            </div>
                            <button className={css.navButton}>
                                <TfiArrowLeft />
                            </button>
                            <button className={css.navButton}>
                                <TfiArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </Body>
        </div>
    </>
}

export default Web_01;


/*
url: https://dribbble.com/shots/22023119-Globwan-Travel-Platform-UI
author: /awsmd
*/