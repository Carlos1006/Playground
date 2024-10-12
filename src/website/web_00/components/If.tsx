import { FC } from "react";
import { IIf } from "../types";

const If: FC<IIf> = ({ condition, className, id = null, children }) => {
  const idProps = id !== null ? { id } : {};
  return condition ? (
    <div className={className} {...idProps}>
      {children}
    </div>
  ) : null;
};

export default If;
