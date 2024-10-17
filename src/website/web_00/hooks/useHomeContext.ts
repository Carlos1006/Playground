import { useContext } from "react";
import { IHomeContext } from "../types";
import HomeContext from "../context/homeContext";

export default function useHomeContext(): IHomeContext {
  return useContext(HomeContext);
}
