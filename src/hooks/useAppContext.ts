import { useContext } from "react";
import AppContext from "../context/appContext";
import { IAppContext } from "../types";

export default function useAppContext(): IAppContext {
  return useContext(AppContext);
}
