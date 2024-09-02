import { useLayoutEffect } from "react";

export function useFavicon(): void {
  useLayoutEffect(() => {
    document.title = "Bento Grid";
    let link: HTMLLinkElement | null =
      document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href =
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐙</text></svg>";
    
    return () => {
      // remove
      link?.remove();
    }
  }, []);
}