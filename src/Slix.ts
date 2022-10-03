import React from "react";
import { SlixPromiseWrapper } from "./SlixPromiseWrapper";
import type { ISlixComp } from "./ISlixComp";
import * as WindowManager from "./lib/WindowManager";

export type SlixKey = string | number;

export type Props<KEY extends SlixKey> = {
  slides: Map<KEY, React.ReactNode>;
  initialSlide: KEY;
};

export type State<KEY extends SlixKey> = {
  currentSlide: KEY;
};

export type SlixInternal<KEY extends SlixKey> = {
  slixPromiseWrapper: SlixPromiseWrapper<KEY>;
};

export class Slix<KEY extends SlixKey>
  extends React.Component<
    Props<KEY> & { internal: SlixInternal<KEY> },
    State<KEY>
  >
  implements ISlixComp<KEY>
{
  protected readonly _slides: Map<KEY, React.ReactNode>;
  public get slides(): ReadonlyArray<KEY> {
    return Array.from(this._slides.keys());
  }

  private readonly _internal: SlixInternal<KEY>;

  public get currentSlide(): KEY {
    return this.state.currentSlide;
  }
  public set currentSlide(slide: KEY) {
    if (this._slides.has(slide)) {
      this.setState({ ...this.state, currentSlide: slide });
      window.location.hash = JSON.stringify(slide);
      for (const childWindow of WindowManager.getChildWindows()) {
        childWindow.postMessage(
          {
            type: "slix:set:currentSlide",
            value: slide,
          },
          window.origin
        );
      }
    } else {
      console.warn(`Slide "${slide}" not found`);
    }
  }

  constructor(props: Props<KEY> & { internal: SlixInternal<KEY> }) {
    super(props);
    this._slides = props.slides;
    this.state = {
      currentSlide: props.initialSlide,
    };
    this._internal = props.internal;

    window.addEventListener("message", (ev) => {
      if (ev.data.type === "slix:set:currentSlide") {
        this.setState({ ...this.state, currentSlide: ev.data.value });
      }
    });
  }

  render(): React.ReactNode {
    this._internal.slixPromiseWrapper.resolve(this);
    return this._slides.get(this.currentSlide);
  }
}
