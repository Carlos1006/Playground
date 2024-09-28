import { createContext } from "react";
import { ASTEROID_CONTEXT_DEFAULT } from "../constants";
import { IAsteroidContext } from "../types";

const AsteroidContext = createContext<IAsteroidContext>(
  ASTEROID_CONTEXT_DEFAULT
);
AsteroidContext.displayName = "ModelContext";

export default AsteroidContext;
