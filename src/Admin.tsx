import React, { Component } from "react";
import { vp } from "./lib/style";
import type { SlixInternal, SlixKey } from "./Slix";
import type { ISlixComp } from "./ISlixComp";

type Props<KEY extends SlixKey> = {
  slides: Map<KEY, React.ReactNode>;
  currentSlide: KEY;
  parent: Window;
  internal: SlixInternal<KEY>;
};

export type State<KEY extends SlixKey> = {
  currentSlide: KEY;
};

export class Admin<KEY extends SlixKey>
  extends Component<Props<KEY>, State<KEY>>
  implements ISlixComp<KEY>
{
  protected readonly _slides: Map<KEY, React.ReactNode>;
  public get slides(): ReadonlyArray<KEY> {
    return Array.from(this._slides.keys());
  }

  protected readonly _parent: Window;
  private readonly _internal: SlixInternal<KEY>;

  public get currentSlide(): KEY {
    return this.state.currentSlide;
  }

  protected set currentSlide(slide: KEY) {
    if (this._slides.has(slide)) {
      this.setState({ ...this.state, currentSlide: slide });
      this._parent.postMessage(
        {
          type: "slix:set:currentSlide",
          value: slide,
        },
        window.origin
      );
    } else {
      console.warn(`Slide "${slide}" not found`);
    }
  }

  constructor(props: Props<KEY>) {
    super(props);
    this.state = {
      currentSlide: props.currentSlide,
    };
    this._slides = props.slides;
    this._parent = props.parent;
    this._internal = props.internal;

    window.addEventListener("message", (ev) => {
      if (ev.source === this._parent) {
        if (ev.data.type === "slix:set:currentSlide") {
          this.setState({ ...this.state, currentSlide: ev.data.value });
        }
      }
    });
  }

  render() {
    this._internal.slixPromiseWrapper.resolve(this);
    return (
      <>
        <ul
          style={{
            position: "fixed",
            overflowY: "scroll",
            height: "477.5vh",
            width: "calc(100vw + 24px)",
            transform: "translate(-40vw, -190vh) scale(0.2)",
            display: "grid",
            gap: "5vmin",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {Array.from(this._slides).map(([key, slideComp]) => (
            <li
              key={key}
              style={vp({
                pointerEvents: "all",
                padding: "0",
                margin: "0",
                width: "100vw",
                height: "100vh",
                cursor: "pointer",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: this.currentSlide === key ? "red" : "black",
                overflow: "hidden",
              })}
              onClick={() => (this.currentSlide = key)}
            >
              <div
                style={vp({
                  pointerEvents: "none",
                  userSelect: "none",
                  width: "100%",
                  height: "100%",
                  display: "block",
                })}
              >
                {slideComp}
              </div>
            </li>
          ))}
        </ul>
        <div
          style={vp({
            position: "fixed",
            top: "10vh",
            left: "22.5vw",
            width: "75vw",
            height: "75vh",
            overflow: "auto",
            pointerEvents: "all",
            zIndex: 1000,
            boxShadow: "0 0 10vw 1vw rgb(0 0 0 / 40%)",
          })}
        >
          {this._slides.get(this.currentSlide)}
        </div>
      </>
    );
  }
}
