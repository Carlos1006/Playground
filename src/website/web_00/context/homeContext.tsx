import { createContext } from "react";
import { IHomeContext } from "../types";
import { HOME_CONTEXT_DEFAULT } from "../constants";

const HomeContext = createContext<IHomeContext>(HOME_CONTEXT_DEFAULT);
HomeContext.displayName = "HomeContext";

export default HomeContext;
