import { useLayoutEffect, useState } from "react";

export function useDarkMode(): {
  darkMode: boolean;
  onDarkModeChange: () => void;
} {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [beginDarkMode, setBeginDarkMode] = useState<boolean>(false);

  const onDarkModeChange = (): void => {
    setBeginDarkMode((prev) => !prev);
  };

  useLayoutEffect(() => {
    setDarkMode((prev) => !prev);
  }, [beginDarkMode]);

  return { darkMode, onDarkModeChange };
}