import React from "react";
import { motion } from "framer-motion";
import type { IAnimation } from "./animations";

type Props = {
  transition?: IAnimation;
  children: React.ReactNode | string | number;
  style?: React.CSSProperties;
};

export const Slide = (props: Props) => {
  const style = structuredClone(props.style);
  if (typeof style.height === "undefined") {
    style.minHeight ??= "100vh";
  }
  if (typeof style.width === "undefined") {
    style.minWidth ??= "100vw";
  }

  return (
    <motion.div {...props.transition} style={style} key={JSON.stringify(props)}>
      {props.children}
    </motion.div>
  );
};
