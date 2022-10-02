import React from "react";
import ReactDOM from "react-dom/client";
import { Slix } from "./Slix";
import type { SlixKey, Props as SlixProps, SlixInternal } from "./Slix";
import { SlixPromiseWrapper } from "./SlixPromiseWrapper";

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

export { React, slix, Slix };
export default slix;
