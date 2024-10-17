import { FC } from "react";
import { IDivIf } from "../types";

const DivIf: FC<IDivIf> = ({
  condition,
  className,
  id = null,
  children,
  themeMode = null,
}: IDivIf) => {
  const idProps = id !== null ? { id } : {};
  return condition ? (
    <div
      className={className}
      {...idProps}
      {...(themeMode !== null ? { "data-theme": themeMode } : {})}
    >
      {children}
    </div>
  ) : null;
};

export default DivIf;
