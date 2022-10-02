import React from "react";
import ReactDOM from "react-dom/client";
import { Slix } from "./Slix";
import type { SlixKey, Props as SlixProps, SlixInternal } from "./Slix";
import { SlixPromiseWrapper } from "./SlixPromiseWrapper";

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

const slix = <KEY extends SlixKey>(
  rootElement: string | Element,
  slixProps: SlixProps<KEY>
) => {
  const rootEl =
    typeof rootElement === "string"
      ? document.querySelector(rootElement)
      : rootElement;

  if (!rootEl) {
    throw new Error("Root element not found");
  }

  const slixInternal: SlixInternal<KEY> = {
    slixPromiseWrapper: new SlixPromiseWrapper<KEY>(),
  };

  ReactDOM.createRoot(rootEl).render(
    <Slix {...slixProps} internal={slixInternal} />
  );

  return slixInternal.slixPromiseWrapper.promise;
};

export { slix, Slix };
export default slix;
