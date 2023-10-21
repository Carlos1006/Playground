import { useContext } from "react";
import { MainContext } from "../context/createContext";

export function useMainContext() {
  return useContext(MainContext);
}