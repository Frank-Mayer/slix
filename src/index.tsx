import React from "react";
import ReactDOM from "react-dom/client";
import { Slix } from "./Slix";
import { Admin } from "./Admin";
import type { SlixKey, Props as SlixProps, SlixInternal } from "./Slix";
import { SlixPromiseWrapper } from "./SlixPromiseWrapper";
import { AnimatePresence } from "framer-motion";
import * as PalentalManager from "./lib/PalentalManager";

// ensure title exists
if (document.getElementsByTagName("title").length === 0) {
  const titleEl = document.createElement("title");
  titleEl.innerText = "Slix";
  document.head.appendChild(titleEl);
}

// ensure favicon exists
if (document.querySelector("link[rel='icon']") === null) {
  const faviconEl = document.createElement("link");
  faviconEl.rel = "icon";
  faviconEl.href =
    "https://raw.githubusercontent.com/Frank-Mayer/slix/main/favicon.svg";
  faviconEl.type = "image/svg+xml";
  document.head.appendChild(faviconEl);
}

export const slix = <KEY extends SlixKey>(
  rootElementSelector: string,
  slixProps: {
    slides: Map<KEY, React.ReactNode>;
    initialSlide: KEY;
  }
) => {
  const rootEl = document.querySelector(
    rootElementSelector
  ) as HTMLElement | null;

  if (!rootEl) {
    throw new Error("Root element not found");
  }

  const slixInternal: SlixInternal<KEY> = {
    slixPromiseWrapper: new SlixPromiseWrapper<KEY>(),
  };

  ReactDOM.createRoot(rootEl).render(
    <AnimatePresence mode="wait">
      {PalentalManager.isChild ? (
        <Admin
          slides={slixProps.slides}
          currentSlide={slixProps.initialSlide}
          identifier={rootElementSelector}
          parent={PalentalManager.getParent()}
        />
      ) : (
        <Slix
          {...slixProps}
          identifier={rootElementSelector}
          internal={slixInternal}
        />
      )}
    </AnimatePresence>
  );

  return slixInternal.slixPromiseWrapper.promise;
};

export * from "./Slix";
export * from "./controllers/index";
export default slix;
