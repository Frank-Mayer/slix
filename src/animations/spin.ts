import type { IAnimation } from "./IAnimation";

export const spinY: IAnimation = {
  initial: { scaleY: 0 },
  animate: { scaleY: 1 },
  exit: { scaleY: 0 },
};

export const spinX: IAnimation = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  exit: { scaleX: 0 },
};
