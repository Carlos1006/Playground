import { useState } from "react";
import { IHeaderMenu } from "../types";
import { _atr_ } from "../utils";
import css from "../styles/Header.module.scss";
import image from "../assets/images/sushi_logo.png";

const Header = () => {
  const leftElements: IHeaderMenu[] = [
    {
      japaneseTitle: "主頁",
      title: "Home",
      id: "home",
    },
    {
      japaneseTitle: "料亭",
      title: "Restaurants",
      id: "restaurants",
    },
    {
      japaneseTitle: "食事",
      title: "Dishes",
      id: "dishes",
    },
  ];
  const rightElements: IHeaderMenu[] = [
    {
      japaneseTitle: "接触",
      title: "Contact us",
      id: "contact",
    },
    {
      japaneseTitle: "ほど",
      title: "About",
      id: "about",
    },
    {
      japaneseTitle: "操作",
      title: "How we Work",
      id: "work",
    },
  ];
  const [selected] = useState("home");

  return (
    <>
      <div id={css.header}>
        <div id={css.headerWrapper}>
          {leftElements.map(
            ({ japaneseTitle, title, id }: IHeaderMenu, index: number) => (
              <div
                className={`${css.element} ${_atr_(
                  selected === id,
                  css.selected
                )}`}
                data-number={index}
                data-id={id}
                key={index}
              >
                <span>{japaneseTitle}</span>
                <span>{title}</span>
              </div>
            )
          )}
          <div id={css.logo}>
            <img src={image} />
            <span>JapanTown</span>
          </div>
          {rightElements.map(
            ({ japaneseTitle, title, id }: IHeaderMenu, index: number) => (
              <div
                className={`${css.element} ${_atr_(
                  selected === id,
                  css.selected
                )}`}
                data-number={index}
                data-id={id}
                key={index}
              >
                <span>{japaneseTitle}</span>
                <span>{title}</span>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
