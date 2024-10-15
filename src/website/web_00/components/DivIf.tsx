import { FC } from "react";
import { IDivIf } from "../types";

const DivIf: FC<IDivIf> = ({
  condition,
  className,
  id = null,
  children,
}: IDivIf) => {
  const idProps = id !== null ? { id } : {};
  return condition ? (
    <div className={className} {...idProps}>
      {children}
    </div>
  ) : null;
};

export default DivIf;
