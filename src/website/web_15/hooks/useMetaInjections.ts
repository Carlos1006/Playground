import { useEffect } from "react";

function useMetaInjections(): void {
  useEffect(() => {
    // add meta to change status bar color
    console.log("useMetaInjections");
    let meta: HTMLMetaElement | null = document.querySelector(
      "meta[name='theme-color']"
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.getElementsByTagName("head")[0].appendChild(meta);
    }
    meta.content = "#000000";
    return (): void => {
      meta?.remove();
    };
  }, []);
}

export default useMetaInjections;
