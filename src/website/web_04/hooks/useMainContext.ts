import { useContext } from "react";
import { IMainContext, MainContext } from "../context/createContext";

export function useMainContext(): IMainContext {
  return useContext(MainContext);
}
