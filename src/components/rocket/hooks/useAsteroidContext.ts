import { useContext } from "react";
import AsteroidContext from "../context/AsteroidContext";
import { IAsteroidContext } from "../types";

export default function useAsteroidContext(): IAsteroidContext {
  return useContext(AsteroidContext);
}
