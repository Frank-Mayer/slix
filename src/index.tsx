import React from "react";
import ReactDOM from "react-dom/client";
import { AnimatePresence } from "framer-motion";
import { Slix } from "./Slix";
import { Admin } from "./Admin";
import type { SlixKey, SlixInternal } from "./Slix";
import { SlixPromiseWrapper } from "./SlixPromiseWrapper";
import * as WindowManager from "./lib/WindowManager";
import { setSlixRoot } from "./lib/slixRoot";

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

// ensure style body has background color
export const resetCss = async () => {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = await (
    await fetch(
      "https://raw.githubusercontent.com/Frank-Mayer/slix/main/dist/reset.css"
    )
  ).text();
  document.head.appendChild(styleEl);
};

export const slix = <KEY extends SlixKey>(slixProps: {
  slides: Map<KEY, React.ReactNode>;
  initialSlide: KEY;
}) => {
  const rootEl = document.createElement("main");
  document.body.appendChild(rootEl);
  setSlixRoot(rootEl);

  if (!rootEl) {
    throw new Error("Root element not found");
  }

  const slixInternal: SlixInternal<KEY> = {
    slixPromiseWrapper: new SlixPromiseWrapper<KEY>(),
  };

  const hash = WindowManager.getHash();

  const currentSlide = hash ? JSON.parse(hash) : slixProps.initialSlide;

  ReactDOM.createRoot(rootEl).render(
    <AnimatePresence mode="wait">
      {WindowManager.isChild ? (
        <Admin
          slides={slixProps.slides}
          currentSlide={currentSlide}
          parent={WindowManager.getParent()}
          internal={slixInternal}
        />
      ) : (
        <Slix {...slixProps} internal={slixInternal} />
      )}
    </AnimatePresence>
  );

  return slixInternal.slixPromiseWrapper.promise;
};

export * from "./Slix";
export * from "./controllers/index";
export default slix;
