import React from "react";
import MainContextProvider from "./context/context";
import Main from "./components/main";

const Web_04: React.FC = () => {
  return (
    <MainContextProvider>
      <Main />
    </MainContextProvider>
  );
};

export default Web_04;
