import React from "react";
import { SlixPromiseWrapper } from "./SlixPromiseWrapper";

export type SlixKey = string | number;

export type Props<KEY extends SlixKey> = {
  slides: Map<KEY, React.ReactNode>;
  initialSlide: KEY;
  identifier: string;
};

export type State<KEY extends SlixKey> = {
  currentSlide: KEY;
};

export type SlixInternal<KEY extends SlixKey> = {
  slixPromiseWrapper: SlixPromiseWrapper<KEY>;
};

export class Slix<KEY extends SlixKey> extends React.Component<
  Props<KEY> & { internal: SlixInternal<KEY> },
  State<KEY>
> {
  protected readonly _slides: Map<KEY, React.ReactNode>;
  public get slides(): ReadonlyArray<KEY> {
    return Array.from(this._slides.keys());
  }

  private readonly _internal: SlixInternal<KEY>;

  public get currentSlide(): KEY {
    return this.state.currentSlide;
  }
  private readonly _identifier: string;

  public set currentSlide(slide: KEY) {
    if (this._slides.has(slide)) {
      this.setState({ ...this.state, currentSlide: slide });
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
    this._identifier = props.identifier;

    window.addEventListener("message", (event) => {
      if (event.data.identifier === this._identifier) {
        if (event.data.type === "slix:set:currentSlide") {
          this.currentSlide = event.data.value;
        }
      }
    });
  }

  render(): React.ReactNode {
    this._internal.slixPromiseWrapper.resolve(this);
    return this._slides.get(this.currentSlide);
  }
}
