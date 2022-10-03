import type { CSSProperties } from "react";

const vendorPrefixes = new Set(["Moz", "ms", "O", "Webkit"]);

/**
 * Add vendor prefixes to a react style object
 */
export const vp = (style: CSSProperties): CSSProperties => {
  const prefixedStyle: CSSProperties = structuredClone(style);

  stylesLoop: for (const key in style) {
    for (const prefix of vendorPrefixes) {
      if (key.startsWith(prefix)) {
        continue stylesLoop;
      }
    }

    for (const prefix of vendorPrefixes) {
      prefixedStyle[prefix + key[0].toUpperCase() + key.slice(1)] = style[key];
    }
  }

  return prefixedStyle;
};
