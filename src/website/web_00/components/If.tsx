import { FC } from "react";
import { IIf } from "../types";

const If: FC<IIf> = ({ condition, children }) => {
  return condition ? children : <></>;
};

export default If;
