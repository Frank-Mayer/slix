import type { Component } from "react";
import type { SlixKey } from "./Slix";

export interface ISlixComp<KEY extends SlixKey> {
  currentSlide: KEY;
  slides: ReadonlyArray<KEY>;
}
