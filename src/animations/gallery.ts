import type { IAnimation } from "./IAnimation";

export const gallery: IAnimation = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
};

export const galleryReverse: IAnimation = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
};
