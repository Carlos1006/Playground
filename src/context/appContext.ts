import { createContext } from "react";
import { IAppContext } from "../types";
import { APP_CONTEXT_DEFAULT } from "../constants";

const AppContext = createContext<IAppContext>(APP_CONTEXT_DEFAULT);
AppContext.displayName = "AppContext";

export default AppContext;
